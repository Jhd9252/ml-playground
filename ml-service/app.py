import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from sklearn.datasets import load_iris, load_wine, load_breast_cancer
import sys
import json

# Available datasets
DATASETS = {
    'iris': load_iris,
    'wine': load_wine,
    'breast_cancer': load_breast_cancer
}

# Available models
MODELS = {
    'random_forest': RandomForestClassifier,
    'logistic_regression': LogisticRegression,
    'svm': SVC
}

def main():
    
    try:
        # read JSON input from stdin
        input_data = sys.stdin.read()
        params = json.loads(input_data)

        # access data
        dataset_name = params.get('dataset')
        model_name = params.get('model')
        parameters = params.get('parameters', {})
        tts = params.get('trainTestSplit', 0.7)

        # Load dataset
        dataset = DATASETS[dataset_name]()
        X, y = dataset.data, dataset.target
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, train_size=tts, random_state=42
        )
        
        # Create and train model
        model = MODELS[model_name](**parameters) 
        model.fit(X_train, y_train)
        
        # Make predictions
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        # Prepare results
        result = {
            'accuracy': float(accuracy),
            'train_size': len(X_train),
            'test_size': len(X_test),
            'dataset': dataset_name,
            'model': model_name,
            'trainTestSplit': tts
        }
        
        # Print result JSON to stdout
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {'error': str(e)}
        print(json.dumps(error_result))
        sys.exit(1)  # exit with error code

if __name__ == '__main__':
    main()
