import mongoose from 'mongoose';

const suspectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, default: '' },
  description: { type: String, required: true },
  alibi: { type: String, required: true },
  motive: { type: String, required: true },
  isCulprit: { type: Boolean, default: false }
}, { _id: false });

const clueSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, default: 'Crime Scene' },
  type: { type: String, default: 'physical' },
  discovered: { type: Boolean, default: false }
}, { _id: false });

const hintSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  revealed: { type: Boolean, default: false }
}, { _id: false });

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  premise: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
    default: 'medium'
  },
  story: {
    synopsis: { type: String, required: true },
    victim: { type: String, required: true },
    crimeType: { type: String, default: 'Theft & Foul Play' },
    sceneLocation: { type: String, required: true },
    timeOfCrime: { type: String, default: 'Around midnight' }
  },
  suspects: [suspectSchema],
  clues: [clueSchema],
  hints: [hintSchema],
  solution: {
    culpritId: { type: String, required: true },
    culpritName: { type: String, required: true },
    explanation: { type: String, required: true }
  },
  playerProgress: {
    discoveredCluesCount: { type: Number, default: 0 },
    hintsUsedCount: { type: Number, default: 0 },
    accusedSuspectId: { type: String, default: null },
    accusedSuspectName: { type: String, default: null },
    isSolved: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    scoreBreakdown: {
      basePoints: { type: Number, default: 0 },
      clueBonus: { type: Number, default: 0 },
      hintPenalty: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date }
  },
  createdAt: { type: Date, default: Date.now }
});

const Case = mongoose.models.Case || mongoose.model('Case', caseSchema);

export default Case;
