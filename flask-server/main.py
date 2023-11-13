import argparse
import http.server
import socketserver
import json
import bcrypt
from database import initialize_database, create_restaurant, find_restaurant_by_email, get_all_pizza_types, remove_pizza_type, create_pizza_types, update_pizza_type, can_sign_in

# Create a new argparse parser
parser = argparse.ArgumentParser(description="Manage pizza types")

# Subparsers for different commands
subparsers = parser.add_subparsers(dest="command")

# Command to add a pizza type
add_parser = subparsers.add_parser("add", help="Add a pizza type")
add_parser.add_argument("name", type=str, help="Name of the pizza type")
add_parser.add_argument("description", type=str, help="Description of the pizza type")
add_parser.add_argument("amount", type=int, help="Amount of the pizza type")
add_parser.add_argument("image_url", type=str, help="Image URL of the pizza type")

# Command to list all pizza types
list_parser = subparsers.add_parser("list", help="List all pizza types")

# Command to search for a pizza type
search_parser = subparsers.add_parser("search", help="Search for a pizza type")
search_parser.add_argument("name", type=str, help="Name of the pizza type to search")

# # Command to create an order
# order_parser = subparsers.add_parser("order", help="Create a pizza")
# order_parser.add_argument("restaurant_id", type=int, help="Restaurant ID for the pizza")
# order_parser.add_argument("pizza_type_id", type=int, help="Pizza Type ID for the order")
# order_parser.add_argument("quantity", type=int, help="Quantity of pizza to order")

# New subparser for "remove" command
remove_parser = subparsers.add_parser("remove", help="Remove a pizza type")
remove_parser.add_argument("pizza_type_id", type=int, help="ID of the pizza type to remove")

# New subparser for "update" command
update_parser = subparsers.add_parser("update", help="Update a pizza type")
update_parser.add_argument("pizza_type_id", type=int, help="ID of the pizza type to update")
update_parser.add_argument("name", type=str, help="New name for the pizza type")
update_parser.add_argument("description", type=str, help="New description for the pizza type")
update_parser.add_argument("amount", type=int, help="New amount for the pizza type")
update_parser.add_argument("image_url", type=str, help="New image URL for the pizza type")

# Initialize the database
initialize_database()

# API Endpoint for retrieving pizza data
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')  # Allow requests from any origin
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        http.server.SimpleHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        if self.path == '/pizza-types':
            pizza_types = get_all_pizza_types()
            pizza_type_data = [
                {"name": pizza[1], "description": pizza[2], "amount": pizza[3], "image_url": pizza[4]}
                for pizza in pizza_types
            ]

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(pizza_type_data).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
            
    def do_POST(self):        
        if self.path == '/add':
            pizza_types = create_pizza_types()
            pizza_type_data = [
                {"name": pizza[1], "description": pizza[2], "amount": pizza[3], "image_url": pizza[4]}
                for pizza in pizza_types
            ]
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(pizza_type_data).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length).decode('utf-8')
        data = json.loads(body)
        
        

        if self.path == '/signup':
            restaurantname = data['restaurantname']
            email = data['email']
            password = data['password']

            existing_user = find_restaurant_by_email(email)
            if existing_user:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"message": "User with this email already exists"}).encode('utf-8'))
                return
            create_restaurant(restaurantname, email, password)

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"message": "User registered successfully"}).encode('utf-8'))
            
        elif self.path == '/signin':
            email = data['email']
            password = data['password']
            is_ok = can_sign_in(email, password)
            if not is_ok:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"message": "User cant signin"}).encode('utf-8'))
                return
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"message": "Successful login"}).encode('utf-8'))

        # elif self.path == '/order':
        #     user_id = data['user_id']
        #     pizza_type_id = data['pizza_type_id']
        #     quantity = data['quantity']
        #     create_order(user_id, pizza_type_id, quantity)

        #     self.send_response(200)
        #     self.send_header('Content-type', 'application/json')
        #     self.end_headers()
        #     self.wfile.write(json.dumps({"message": "Order created successfully"}).encode('utf-8'))

        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    args = parser.parse_args()

    if args.command == "add":
        # Retrieve arguments
        name = args.name
        description = args.description
        amount = args.amount
        image_url = args.image_url

        # Implement the logic to add a pizza type with image_url
        print(f"Adding a pizza type: {name}, Description: {description}, , Amount: {amount}, Image URL: {image_url}")

    elif args.command == "list":
        pizza_types = get_all_pizza_types()
        pizza_type_data = [
            {"name": pizza[1], "description": pizza[2], "rate": pizza[3], "amount": pizza[4], "image_url": pizza[5]}
            for pizza in pizza_types
        ]

        print("Listing all pizza types")
        print(pizza_type_data)

    elif args.command == "search":
        name = args.name
        print(f"Searching for pizza type: {name}")

    elif args.command == "remove":
        pizza_type_id = args.pizza_type_id
        remove_pizza_type(pizza_type_id)
        print(f"Removed pizza type with ID: {pizza_type_id}")

    elif args.command == "update":
        pizza_type_id = args.pizza_type_id
        new_name = args.name
        new_description = args.description
        new_amount = args.amount
        new_image_url = args.image_url

        update_pizza_type(pizza_type_id, new_name, new_description, new_amount, new_image_url)
        print(f"Updated pizza type with ID: {pizza_type_id}")
        
    with socketserver.TCPServer(("", 80), CustomHandler) as httpd:
        print("Serving at port 80")
        httpd.serve_forever()
