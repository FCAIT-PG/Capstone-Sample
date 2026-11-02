"""Trains the product category classifier and writes metrics to models/metrics.json.

Stubbed for the documentation sample. A real implementation follows the training setup in section 10.10.4 of docs/10-MODULES-OF-THE-SYSTEM.md:
  1. Load ml/data/raw/, drop rows with empty title or unmapped category
  2. Map source categories onto the 8 ShopSphere categories
  3. Remove duplicate titles BEFORE splitting (avoids train/test leakage)
  4. Stratified 70/15/15 split with random_state=42
  5. Fit TfidfVectorizer(ngram_range=(1, 2), max_features=20000, sublinear_tf=True)
     + LogisticRegression(C=5, class_weight="balanced", max_iter=1000)
  6. Tune C and the n-gram range on the validation set only
  7. Evaluate ONCE on the test set (accuracy, macro-F1, top-3 accuracy) and write models/metrics.json
"""

RANDOM_SEED = 42


def main():
    raise NotImplementedError("Sample stub: see the steps in this file's docstring.")


if __name__ == "__main__":
    main()
