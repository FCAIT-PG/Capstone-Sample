"""Exports the trained model to JSON so the Node backend can run predictions without Python.

Stubbed for the documentation sample. A real implementation writes:
  - the vectorizer vocabulary and IDF values
  - the logistic regression coefficient matrix and intercepts
  - the ordered list of category labels
to ml/models/category_model.json, then copies it to backend/src/ml/category_model.json
so the backend can be deployed on its own.
"""


def main():
    raise NotImplementedError("Sample stub: see the description in this file's docstring.")


if __name__ == "__main__":
    main()
