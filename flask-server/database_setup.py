from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, ForeignKey

# Create engine
engine = create_engine('sqlite:///pizza_restaurants.db')

# Create MetaData instance
metadata = MetaData()

# Define pizza table
pizza = Table('pizza', metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String),
    Column('ingredients', String)
)

# Define restaurant table
restaurant = Table('restaurant', metadata,
    Column('id', Integer, primary_key=True),
    Column('restaurant_name', String),
    Column('email', String),
    Column('password', String),
    Column('phone_number', Integer)
)

# Define restaurant_pizza table
restaurant_pizza = Table('restaurant_pizza', metadata,
    Column('id', Integer, primary_key=True),
    Column('price', Integer),
    Column('pizza_id', Integer, ForeignKey('pizza.id')),
    Column('restaurant_id', Integer, ForeignKey('restaurant.id'))
)

# Create tables
metadata.create_all(engine)
