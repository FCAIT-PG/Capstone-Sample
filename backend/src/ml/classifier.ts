// Category suggestion — loads the exported model once at startup and scores text in-process.
// Stubbed for documentation-sample purposes. See section 10.10 in docs/10-MODULES-OF-THE-SYSTEM.md.
//
// Real implementation steps:
//   1. Load category_model.json once (vocabulary, idf, coefficients, intercepts, categories)
//   2. Tokenize with the same rules as the Python vectorizer (lowercase, word 1-2 grams)
//   3. Build the sublinear TF-IDF vector, L2-normalise it
//   4. Multiply by the coefficient matrix, add intercepts, apply softmax
//   5. Return the top 3 categories with confidence, flagging low confidence (< 0.5)

import model from './category_model.json';
import { SuggestionResult } from '../models/types';

export function suggestCategories(text: string): SuggestionResult {
  throw new Error('Sample stub: see the steps in this file header.');
}

export const categories: string[] = model.categories;
