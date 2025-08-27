from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from sklearn.datasets import load_iris, load_wine, load_breast_cancer

app = Flask(__name__)
CORS(app)

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

@app.route('/datasets', methods=['GET'])
def get_datasets():
    return jsonify(list(DATASETS.keys()))

@app.route('/models', methods=['GET'])
def get_models():
    return jsonify(list(MODELS.keys()))

@app.route('/train', methods=['POST'])
def train_model():
    try:
        data = request.json
        dataset_name = data['dataset']
        model_name = data['model']
        parameters = data.get('parameters', {})
        train_test_split_ratio = data.get('train_test_split', 0.8)
        
        # Load dataset
        dataset = DATASETS[dataset_name]()
        X, y = dataset.data, dataset.target
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, train_size=train_test_split_ratio, random_state=42
        )
        
        # Create and train model
        model_class = MODELS[model_name]
        model = model_class(**parameters)
        model.fit(X_train, y_train)
        
        # Make predictions
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        return jsonify({
            'accuracy': float(accuracy),
            'train_size': len(X_train),
            'test_size': len(X_test),
            'dataset_info': {
                'features': dataset.feature_names.tolist() if hasattr(dataset, 'feature_names') else [],
                'target_names': dataset.target_names.tolist() if hasattr(dataset, 'target_names') else []
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)