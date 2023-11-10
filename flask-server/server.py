
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os

app = Flask(__name__)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza_restaurants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'wtficbtihtm'  # Replace with your secret key
db = SQLAlchemy(app)
jwt = JWTManager(app)


    


class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    phone_number = db.Column(db.String(15))
    pizzas = db.relationship('Pizza', secondary='restaurant_pizza', back_populates='restaurants')

class Pizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    ingredients = db.Column(db.String(200))
    restaurants=  db.relationship('Restaurant', secondary='restaurant_pizza', back_populates='pizzas')

class RestaurantPizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    pizza = db.relationship('Pizza', backref='restaurant_pizzas')
    restaurant = db.relationship('Restaurant', backref='pizza_restaurants')


# Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    restaurant = Restaurant(
        restaurant_name=data['restaurant_name'],
        email=data['email'],
        password=data['password'],
        phone_number=data['phone_number']
    )
    db.session.add(restaurant)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

# Login
@app.route('/', methods=['POST',])
def login():
    data = request.json
    restaurant = Restaurant.query.filter_by(email=data['email']).first()
    if restaurant and data['password'] == restaurant.password:
        access_token = create_access_token(identity=restaurant.id)
        return jsonify(access_token=access_token)
    return jsonify({'message': 'Invalid credentials'}), 401

# Add a new pizza
@app.route('/add_pizza', methods=['POST'])
@jwt_required()
def add_pizza():
    data = request.get_json()
    new_pizza = Pizza(name=data['name'], price=data['price'], ingredients=data['ingredients'], restaurant_id=get_jwt_identity())
    db.session.add(new_pizza)
    db.session.commit()
    return jsonify({"message": "Pizza added successfully"}), 201

# Get all pizzas
@app.route('/get_pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    return jsonify([pizza.serialize for pizza in pizzas]), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
