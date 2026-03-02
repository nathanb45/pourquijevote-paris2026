import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const quizQuestions = pgTable('quiz_questions', {
  id: serial('id').primaryKey(),
  theme: varchar('theme', { length: 100 }).notNull(),
  text: text('text').notNull(),
  positions: jsonb('positions').notNull().$type<Record<string, -1 | 0 | 1>>(),
  context: jsonb('context').notNull().$type<{
    description: string
    pour: string[]
    contre: string[]
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const quizSessions = pgTable('quiz_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  userAgent: text('user_agent'),
  questionCount: integer('question_count'),
})

export const quizAnswers = pgTable(
  'quiz_answers',
  {
    id: serial('id').primaryKey(),
    sessionId: uuid('session_id')
      .references(() => quizSessions.id)
      .notNull(),
    questionId: integer('question_id')
      .references(() => quizQuestions.id)
      .notNull(),
    value: smallint('value').notNull(),
    priority: boolean('priority').notNull().default(false),
    answeredAt: timestamp('answered_at').defaultNow().notNull(),
  },
  (t) => [unique().on(t.sessionId, t.questionId)],
)
