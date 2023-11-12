import sqlite3
import bcrypt

# Initialize the database
def initialize_database():
    connection = sqlite3.connect('db.sqlite')
    cursor = connection.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS restaurant (
            id INTEGER PRIMARY KEY,
            restaurantname TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            salt TEXT NOT NULL
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pizza_types (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            image_url TEXT NOT NULL,
            description TEXT NOT NULL,
            amount REAL NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS restaurant_pizzas (
            restaurant_id INTEGER,
            pizza_types_id INTEGER,
            FOREIGN KEY(restaurant_id) REFERENCES restaurant(id),
            FOREIGN KEY(pizza_types_id) REFERENCES pizza_types(id),
            PRIMARY KEY(restaurant_id, pizza_types_id)
            )
                   
        ''')

    # cursor.execute('''
    #     CREATE TABLE IF NOT EXISTS orders (
    #         id INTEGER PRIMARY KEY,
    #         restaurant_id INTEGER,
    #         pizza_type_id INTEGER,
    #         quantity INTEGER,
    #         FOREIGN KEY (user_id) REFERENCES users(id),
    #         FOREIGN KEY (honey_type_id) REFERENCES honey_types(id)
    #     )
    # ''')

    # Insert hardcoded pizza types
    pizza_types_data = [
       ("cheese pizza", "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2018/04/sicilian-cheese-1-1024x626.jpg.webp", "Cheese pizza is one of the most popular choices. It will always be a simple, unadorned masterpiece on its own.", 250),
        ("vegie pizza", "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2017/10/shutterstock_570541132.jpg.webp", "Everything from peppers and mushrooms, to eggplant and onions make for an exciting and tasty veggie pizza.", 300),
        ("pepperoni pizza", "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2017/10/shutterstock_514457074.jpg.webp", "Renowned for its potential health benefits and unique flavor.",  200),
        ("meat pizza", "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2017/10/shutterstock_514457074.jpg.webp", "Pile on ground beef and sausage for a hearty meal.", 350),
        ("margherita pizza", "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2017/10/shutterstock_347791016.jpg.webp", "Deceptively simple, the Margherita pizza is made with basil, fresh mozzarella, and tomatoes.", 275),
        ("BBQ chicken pizza", "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2017/10/shutterstock_184944413.jpg.webp.", "randome",  225),
        ("hawaiian pizza", "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2017/10/shutterstock_313437680.jpg.webp", "unexpectedly solid sweet and salty combination for this type of pizza.",  320),
        ("bufalo pizza", "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2021/02/Pizza-Buffalo-Chicken-1024x682.jpg.webp", "All its spicy, salty, buttery goodness is a natural pairing for pizza.", 275),
        ("supreme pizza", "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2017/10/shutterstock_244706695.jpg.webp", "it\s the combination of the flavors that really makes it sing.", 240),
        ("the works pizza", "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2017/10/shutterstock_84904876.jpg.webp", "And when the supreme just isn/t enough, you\re ready for the works", 280)
    ]
    
    

    #cursor.executemany("INSERT INTO pizza_types (name, image_url, description, amount) VALUES (?, ?, ?, ?)", pizza_types_data)
    #cursor.executemany("INSERT INTO pizza_types (name, image_url, description, amount) VALUES (?, ?, ?, ?)", [(name, image_url, description, amount) for name, image_url, description, amount, _ in pizza_types_data])
    cursor.executemany("INSERT OR IGNORE INTO pizza_types (name, image_url, description, amount) VALUES (?, ?, ?, ?)", pizza_types_data)
    salt = bcrypt.gensalt()
    cursor.executemany("INSERT OR IGNORE INTO restaurant (restaurantname, email, password, salt) VALUES (?, ?, ?, ?)", [
        ("r1", "email1", bcrypt.hashpw("email1".encode('utf-8'), salt).decode('utf-8'), salt.decode('utf-8')),
        ("r2", "email2", bcrypt.hashpw("email2".encode('utf-8'), salt).decode('utf-8'), salt.decode('utf-8')),
    ] )
    
    cursor.executemany("INSERT OR IGNORE INTO restaurant_pizzas (restaurant_id, pizza_types_id) VALUES (?, ?)", [
        (1, 1),
        (1, 2),
        (2, 1),
        (2, 3),
    ])


    connection.commit()
    connection.close()

# Function to create a user
def create_restaurant(restaurantname, email, raw_password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), salt).decode('utf-8')
    connection = sqlite3.connect('db.sqlite')
    cursor = connection.cursor()
    cursor.execute("INSERT INTO restaurant (restaurantname, email, password, salt) VALUES (?, ?, ?, ?)", (restaurantname, email, hashed_password, salt))
    connection.commit()
    connection.close()

# Function to find a user by email
def find_restaurant_by_email(email):
    connection = sqlite3.connect('db.sqlite')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM restaurant WHERE email=?", (email,))
    restaurant = cursor.fetchone()
    connection.close()
    return restaurant


# Function to find a user by email
def can_sign_in(email, raw_password):
    connection = sqlite3.connect('db.sqlite')
    cursor = connection.cursor()
    cursor.execute("SELECT password, salt FROM restaurant WHERE email=?", (email, ))
    restaurant = cursor.fetchone()
    connection.close()
    password, salt = restaurant
    provided_password = bcrypt.hashpw(raw_password.encode('utf-8'), salt).decode('utf-8')
    return password == provided_password


# Function to retrieve all pizza types
def get_all_pizza_types():
    connection = sqlite3.connect('db.sqlite')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM pizza_types")
    pizza_types = cursor.fetchall()
    connection.close()
    return pizza_types

# Function to create a pizza
def create_pizza_types(name, image_url, description, amount):
    connection = sqlite3.connect('db.sqlite')
    cursor = connection.cursor()
    cursor.execute("INSERT INTO pizza_types (name, image_url, description, amount) VALUES (?, ?, ?, ?)", (name, image_url, description, amount))
    connection.commit()
    connection.close()

# Function to remove a pizza type
def remove_pizza_type(pizza_type_id):
    connection = sqlite3.connect('db.sqlite')
    cursor = connection.cursor()
    cursor.execute("DELETE FROM pizza_types WHERE id=?", (pizza_type_id,))
    connection.commit()
    connection.close()

# Function to update a pizza type
def update_pizza_type(pizza_type_id, name, description, amount, image_url):
    connection = sqlite3.connect('db.sqlite')
    cursor = connection.cursor()
    cursor.execute("UPDATE pizza_types SET name=?, description=?, amount=?, image_url=? WHERE id=?", (name, description, amount, image_url, pizza_type_id))
    connection.commit()
    connection.close()
    
    
    
if __name__ == '__main__':
    print(can_sign_in("email1", "email1"))
    print(can_sign_in("email1", "wrong"))


    