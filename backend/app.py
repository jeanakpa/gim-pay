from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configuration
app.config['SECRET_KEY'] = 'gim-pay'  # Changez ceci pour une clé secrète sécurisée

# Base de données simulée (à remplacer par une vraie base de données dans un environnement de production)
users = []
solutions = [
    {"id": 1, "name": "GIM-PAY direct", "description": "Solution de paiement en ligne simple et rapide pour les petites entreprises."},
    {"id": 2, "name": "GIM-PAY integration", "description": "API robuste pour intégrer les paiements dans votre plateforme existante."},
    {"id": 3, "name": "GIM-PAY TPE", "description": "Terminal de paiement électronique pour les transactions en magasin."},
    {"id": 4, "name": "GIM-PAY mobile", "description": "Application mobile pour accepter les paiements partout."}
]

# Routes
@app.route('/api/solutions', methods=['GET'])
def get_solutions():
    return jsonify(solutions)


#INSCRIPTION
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"message": "Données d'inscription incomplètes"}), 400
    
    hashed_password = generate_password_hash(data['password'])
    new_user = {
        "id": len(users) + 1,
        "username": data['username'],
        "password": hashed_password
    }
    users.append(new_user)
    return jsonify({"message": "Utilisateur enregistré avec succès"}), 201


#CONNEXION
@app.route('/api/login', methods=['POST'])
def login():
    auth = request.json
    if not auth or not auth.get('username') or not auth.get('password'):
        return jsonify({"message": "Impossible de vérifier"}), 401

    user = next((user for user in users if user["username"] == auth['username']), None)
    if user and check_password_hash(user['password'], auth['password']):
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'])
        return jsonify({"token": token})

    return jsonify({"message": "Identifiants invalides"}), 401


#INFOS UTILISATEURS
@app.route('/api/user', methods=['GET'])
def get_user():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token manquant"}), 401
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        user = next((user for user in users if user["id"] == data['user_id']), None)
        if user:
            return jsonify({"username": user['username']})
    except:
        return jsonify({"message": "Token invalide"}), 401
    
    return jsonify({"message": "Utilisateur non trouvé"}), 404


#MAIN PRINCIPALE
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
