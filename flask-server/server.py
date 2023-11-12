
# # from flask import Flask, request, jsonify
# # from flask_sqlalchemy import SQLAlchemy
# # from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
# # import os

# # app = Flask(__name__)

# # # Database setup
# # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza_restaurants.db'
# # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# # app.config['JWT_SECRET_KEY'] = 'wtficbtihtm'  # Replace with your secret key
# # db = SQLAlchemy(app)
# # jwt = JWTManager(app)


    
# # class Restaurant(db.Model):
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(100))
# #     email = db.Column(db.String(100), unique=True)
# #     password = db.Column(db.String(100))
# #     phone_number = db.Column(db.String(15))
# #     pizzas = db.relationship('Pizza', secondary='restaurant_pizza', back_populates='restaurants')
    
# #     @classmethod
# #     def find_restaurant_by_email(cls, email):
# #         connection = sqlite3.connect('pizza_restaurants.db')
# #         cursor = connection.cursor()
# #         cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
# #         user_data = cursor.fetchone()
# #         connection.close()

# #         if user_data:
# #             user = User(*user_data)
# #             return user
# #         else:
# #             return None

# # class Pizza(db.Model):
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(100))
# #     ingredients = db.Column(db.String(200))
# #     restaurants=  db.relationship('Restaurant', secondary='restaurant_pizza', back_populates='pizzas')
    
# #     @classmethod
# #     def get_all_pizza_types(cls):
# #         connection = sqlite3.connect('pizza_restaurants.db')
# #         cursor = connection.cursor()
# #         cursor.execute("SELECT * FROM pizza_types")
# #         pizza_types_data = cursor.fetchall()
# #         connection.close()

# #         pizza = [PizzaType(*pizza_data) for pizza_data in pizza_types_data]
# #         return pizza
    
# #     def save_to_database(self):
# #         connection = sqlite3.connect('pizza_restaurants.db')
# #         cursor = connection.cursor()
# #         cursor.execute("INSERT INTO orders (user_id, pizza_type_id, quantity) VALUES (?, ?, ?)",
# #                        (self.user_id, self.pizza_type_id, self.quantity))
# #         connection.commit()
# #         connection.close()

# # class RestaurantPizza(db.Model):
# #     id = db.Column(db.Integer, primary_key=True)
# #     price = db.Column(db.Float, nullable=False)
# #     pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'), nullable=False)
# #     restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
# #     pizza = db.relationship('Pizza', backref='restaurant_pizzas')
# #     restaurant = db.relationship('Restaurant', backref='pizza_restaurants')


# # # Registration
# # @app.route('/register', methods=['POST', 'GET'])
# # def register():
# #     data = request.json
# #     restaurant = Restaurant(
# #         restaurant_name=data['restaurant_name'],
# #         email=data['email'],
# #         password=data['password'],
# #         phone_number=data['phone_number']
# #     )
# #     db.session.add(restaurant)
# #     db.session.commit()
# #     return jsonify({'message': 'User registered successfully'}), 201

# # # Login
# # @app.route('/', methods=['POST',])
# # def login():
# #     data = request.json
# #     restaurant = Restaurant.query.filter_by(email=data['email']).first()
# #     if restaurant and data['password'] == restaurant.password:
# #         access_token = create_access_token(identity=restaurant.id)
# #         return jsonify(access_token=access_token)
# #     return jsonify({'message': 'Invalid credentials'}), 401

# # # Add a new pizza
# # @app.route('/add_pizza', methods=['POST', 'GET'])
# # @jwt_required()
# # def add_pizza():
# #     data = request.get_json()
# #     pizza = Pizza(name=data['name'], price=data['price'], ingredients=data['ingredients'],)
# #     db.session.add(pizza)
# #     db.session.commit()
# #     return jsonify({"message": "Pizza added successfully"}), 201

# # # Get all pizzas
# # @app.route('/get_pizzas', methods=['GET'])
# # def get_pizzas():
# #     pizzas = Pizza.query.all()
# #     return jsonify([pizza.serialize for pizza in pizzas]), 200

# # if __name__ == '__main__':
# #     with app.app_context():
# #         db.create_all()
# #     app.run(debug=True)
# import sqlite3

# class Restaurant:
#     def __init__(self, id, restautantname, email, password):
#         self.id = id
#         self.restaurantname = restautantname
#         self.email = email
#         self.password = password

#     @classmethod
#     def find_restaurant_by_email(cls, email):
#         connection = sqlite3.connect('db.sqlite')
#         cursor = connection.cursor()
#         cursor.execute("SELECT * FROM restaurant WHERE email = ?", (email,))
#         restaurant_data = cursor.fetchone()
#         connection.close()

#         if restaurant_data:
#             restaurant = Restaurant(*restaurant_data)
#             return restaurant
#         else:
#             return None

#     # Other User methods here

# class PizzaType:
#     def __init__(self, id, name, image_url, description, amount):
#         self.id = id
#         self.name = name
#         self.image_url = image_url
#         self.description = description
#         self.amount = amount

#     @classmethod
#     def get_all_pizza_types(cls):
#         connection = sqlite3.connect('db.sqlite')
#         cursor = connection.cursor()
#         cursor.execute("SELECT * FROM pizza_types")
#         pizza_types_data = cursor.fetchall()
#         connection.close()

#         pizza_types = [PizzaType(*pizza_data) for pizza_data in pizza_types_data]
#         return pizza_types

#     @classmethod
#     def create_pizza_types(name, image_url, description, amount):
#         connection = sqlite3.connect('db.sqlite')
#         cursor = connection.cursor()
#         cursor.execute("INSERT INTO pizza_types (name, image_url, description, amount) VALUES (?, ?, ?, ?)", (name, image_url, description, amount))
#         connection.commit()
#         connection.close()

#     @classmethod
#     def remove_pizza_type(pizza_type_id):
#         connection = sqlite3.connect('db.sqlite')
#         cursor = connection.cursor()
#         cursor.execute("DELETE FROM pizza_types WHERE id=?", (pizza_type_id,))
#         connection.commit()
#         connection.close()

#     @classmethod
#     def update_pizza_type(pizza_type_id, name, description, amount, image_url):
#         connection = sqlite3.connect('db.sqlite')
#         cursor = connection.cursor()
#         cursor.execute("UPDATE pizza_types SET name=?, description=?, amount=?, image_url=? WHERE id=?", (name, description, amount, image_url, pizza_type_id))
#         connection.commit()
#         connection.close()

# # class Order:
# #     def __init__(self, user_id, pizza_type_id, quantity):
# #         self.user_id = user_id
# #         self.pizza_type_id = pizza_type_id
# #         self.quantity = quantity

# #     def save_to_database(self):
# #         connection = sqlite3.connect('db.sqlite')
# #         cursor = connection.cursor()
# #         cursor.execute("INSERT INTO orders (user_id, pizza_type_id, quantity) VALUES (?, ?, ?)",
# #                        (self.user_id, self.pizza_type_id, self.quantity))
# #         connection.commit()
# #         connection.close()

# #     @classmethod
# #     def get_orders_by_user(cls, user_id):
# #         connection = sqlite3.connect('db.sqlite')
# #         cursor = connection.cursor()
# #         cursor.execute("SELECT * FROM orders WHERE user_id = ?", (user_id,))
# #         order_data = cursor.fetchall()
# #         connection.close()

# #         orders = [Order(*order) for order in order_data]
# #         return orders