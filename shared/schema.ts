import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - mandatory for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - mandatory for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  ecoPoints: integer("eco_points").default(0),
  carbonFootprint: decimal("carbon_footprint", { precision: 10, scale: 2 }).default("0"),
  greenTier: varchar("green_tier").default("Bronze"),
  language: varchar("language").default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Waste entries table
export const wasteEntries = pgTable("waste_entries", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  wasteType: varchar("waste_type").notNull(), // organic, plastic, e-waste, hazardous, bulk
  quantity: decimal("quantity", { precision: 8, scale: 2 }).notNull(),
  unit: varchar("unit").notNull(), // kg, liters, pieces
  disposalMethod: varchar("disposal_method"), // recycle, compost, landfill, hazardous
  ecoPointsEarned: integer("eco_points_earned").default(0),
  imageUrl: varchar("image_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Pickup schedules table
export const pickupSchedules = pgTable("pickup_schedules", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  wasteType: varchar("waste_type").notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  status: varchar("status").default("scheduled"), // scheduled, in-progress, completed, cancelled
  address: text("address").notNull(),
  specialInstructions: text("special_instructions"),
  estimatedQuantity: varchar("estimated_quantity"),
  actualQuantity: decimal("actual_quantity", { precision: 8, scale: 2 }),
  pickupPersonnel: varchar("pickup_personnel"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Community reports table
export const communityReports = pgTable("community_reports", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  reportType: varchar("report_type").notNull(), // overflowing_bin, illegal_dumping, cleanup_needed
  description: text("description").notNull(),
  location: text("location").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  imageUrl: varchar("image_url"),
  status: varchar("status").default("reported"), // reported, investigating, resolved
  priority: varchar("priority").default("medium"), // low, medium, high, urgent
  assignedTo: varchar("assigned_to"),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Cleanup events table
export const cleanupEvents = pgTable("cleanup_events", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  location: text("location").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  eventDate: timestamp("event_date").notNull(),
  duration: integer("duration"), // in minutes
  maxParticipants: integer("max_participants"),
  currentParticipants: integer("current_participants").default(0),
  organizerId: varchar("organizer_id").references(() => users.id),
  ecoPointsReward: integer("eco_points_reward").default(0),
  status: varchar("status").default("upcoming"), // upcoming, ongoing, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

// Event participants table
export const eventParticipants = pgTable("event_participants", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").references(() => cleanupEvents.id),
  userId: varchar("user_id").references(() => users.id),
  joinedAt: timestamp("joined_at").defaultNow(),
  attended: boolean("attended").default(false),
  ecoPointsEarned: integer("eco_points_earned").default(0),
});

// Eco challenges table
export const ecoChallenges = pgTable("eco_challenges", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  challengeType: varchar("challenge_type").notNull(), // daily, weekly, monthly
  targetValue: integer("target_value").notNull(),
  unit: varchar("unit").notNull(),
  ecoPointsReward: integer("eco_points_reward").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// User challenge progress table
export const userChallengeProgress = pgTable("user_challenge_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  challengeId: integer("challenge_id").references(() => ecoChallenges.id),
  currentProgress: integer("current_progress").default(0),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  ecoPointsEarned: integer("eco_points_earned").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Rewards table
export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  type: varchar("type").notNull(), // voucher, discount, donation
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  ecoPointsCost: integer("eco_points_cost").notNull(),
  category: varchar("category"), // eco_products, food, transportation, donation
  validUntil: timestamp("valid_until"),
  isActive: boolean("is_active").default(true),
  stockQuantity: integer("stock_quantity"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User rewards table
export const userRewards = pgTable("user_rewards", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  rewardId: integer("reward_id").references(() => rewards.id),
  redemptionCode: varchar("redemption_code"),
  redeemedAt: timestamp("redeemed_at").defaultNow(),
  usedAt: timestamp("used_at"),
  isUsed: boolean("is_used").default(false),
  expiresAt: timestamp("expires_at"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  wasteEntries: many(wasteEntries),
  pickupSchedules: many(pickupSchedules),
  communityReports: many(communityReports),
  organizedEvents: many(cleanupEvents),
  eventParticipations: many(eventParticipants),
  challengeProgress: many(userChallengeProgress),
  redeemedRewards: many(userRewards),
}));

export const wasteEntriesRelations = relations(wasteEntries, ({ one }) => ({
  user: one(users, { fields: [wasteEntries.userId], references: [users.id] }),
}));

export const pickupSchedulesRelations = relations(pickupSchedules, ({ one }) => ({
  user: one(users, { fields: [pickupSchedules.userId], references: [users.id] }),
}));

export const communityReportsRelations = relations(communityReports, ({ one }) => ({
  user: one(users, { fields: [communityReports.userId], references: [users.id] }),
}));

export const cleanupEventsRelations = relations(cleanupEvents, ({ one, many }) => ({
  organizer: one(users, { fields: [cleanupEvents.organizerId], references: [users.id] }),
  participants: many(eventParticipants),
}));

export const eventParticipantsRelations = relations(eventParticipants, ({ one }) => ({
  event: one(cleanupEvents, { fields: [eventParticipants.eventId], references: [cleanupEvents.id] }),
  user: one(users, { fields: [eventParticipants.userId], references: [users.id] }),
}));

export const userChallengeProgressRelations = relations(userChallengeProgress, ({ one }) => ({
  user: one(users, { fields: [userChallengeProgress.userId], references: [users.id] }),
  challenge: one(ecoChallenges, { fields: [userChallengeProgress.challengeId], references: [ecoChallenges.id] }),
}));

export const userRewardsRelations = relations(userRewards, ({ one }) => ({
  user: one(users, { fields: [userRewards.userId], references: [users.id] }),
  reward: one(rewards, { fields: [userRewards.rewardId], references: [rewards.id] }),
}));

// Insert schemas
export const insertWasteEntrySchema = createInsertSchema(wasteEntries).omit({
  id: true,
  createdAt: true,
});

export const insertPickupScheduleSchema = createInsertSchema(pickupSchedules).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertCommunityReportSchema = createInsertSchema(communityReports).omit({
  id: true,
  createdAt: true,
  resolvedAt: true,
});

export const insertCleanupEventSchema = createInsertSchema(cleanupEvents).omit({
  id: true,
  createdAt: true,
});

export const insertUserChallengeProgressSchema = createInsertSchema(userChallengeProgress).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertUserRewardSchema = createInsertSchema(userRewards).omit({
  id: true,
  redeemedAt: true,
});

// Type exports
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type WasteEntry = typeof wasteEntries.$inferSelect;
export type InsertWasteEntry = z.infer<typeof insertWasteEntrySchema>;
export type PickupSchedule = typeof pickupSchedules.$inferSelect;
export type InsertPickupSchedule = z.infer<typeof insertPickupScheduleSchema>;
export type CommunityReport = typeof communityReports.$inferSelect;
export type InsertCommunityReport = z.infer<typeof insertCommunityReportSchema>;
export type CleanupEvent = typeof cleanupEvents.$inferSelect;
export type InsertCleanupEvent = z.infer<typeof insertCleanupEventSchema>;
export type EcoChallenge = typeof ecoChallenges.$inferSelect;
export type UserChallengeProgress = typeof userChallengeProgress.$inferSelect;
export type InsertUserChallengeProgress = z.infer<typeof insertUserChallengeProgressSchema>;
export type Reward = typeof rewards.$inferSelect;
export type UserReward = typeof userRewards.$inferSelect;
export type InsertUserReward = z.infer<typeof insertUserRewardSchema>;
