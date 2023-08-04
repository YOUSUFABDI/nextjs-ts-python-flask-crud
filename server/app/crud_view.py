from app import app
from flask import request, jsonify
import mysql.connector
from dotenv import load_dotenv, dotenv_values
import os

load_dotenv()

# DB config
db_username = os.getenv("DB_USERNAME")
db_password = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME")
host = os.getenv("HOST")


@app.route("/api/v1/register", methods=["POST"])
def register_user():
    name = request.json["name"]
    phone = request.json["phone"]
    gmail = request.json["gmail"]

    # Connect to the DB
    db = mysql.connector.connect(
        host=host, user=db_username, password=db_password, database=db_name
    )

    # Create cursor object
    cursor = db.cursor()

    # Create query
    query = "INSERT INTO users(name, phone, gmail) VALUES(%s, %s, %s)"
    values = (name, phone, gmail)

    # Execute the query
    cursor.execute(query, values)
    db.commit()

    return jsonify({"message": f"{name} is registered successfully 🥳"})


# Display all users
@app.route("/api/v1/diplay-users", methods=["GET"])
def display_all_users():
    # Connect to DB
    db = mysql.connector.connect(
        host=host, user=db_username, password=db_password, database=db_name
    )

    # Create object
    cursor = db.cursor()

    # Create query
    query = "SELECT * FROM users"

    # Execute the query
    cursor.execute(query)

    # Fetch all rows and convert to a list of dictionaries
    users = []
    rows = cursor.fetchall()
    for row in rows:
        user = {"id": row[0], "name": row[1], "phone": row[2], "email": row[3]}
        users.append(user)

    # Close the cursor
    cursor.close()

    # Return the list of users as a JSON response
    return jsonify({"data": users})


# Delete user
@app.route("/api/v1/delete-user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        # Connect to the DB
        db = mysql.connector.connect(
            host=host, user=db_username, password=db_password, database=db_name
        )

        # Create object
        cursor = db.cursor()

        # Create query
        query = "DELETE FROM users WHERE id = %s"

        # Execute the query
        cursor.execute(query, (user_id,))

        db.commit()
        cursor.close()

        # Return json response
        return jsonify({"message": "User deleted successfully 😔", "status code": 200})

    except Exception as e:
        return jsonify({"Error": str(e), "status code": 500})


# Update user information
@app.route("/api/v1/update-user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    try:
        # Get the updated user information from the request body
        name = request.json["name"]
        phone = request.json["phone"]
        gmail = request.json["gmail"]

        # Connect to DB
        db = mysql.connector.connect(
            host=host, user=db_username, password=db_password, database=db_name
        )

        # Create cursor
        cursor = db.cursor()

        # Create query
        query = "UPDATE users SET name = %s, phone = %s, gmail = %s WHERE id = %s"

        values = (name, phone, gmail, user_id)

        # Execute the query
        cursor.execute(query, values)

        db.commit()
        cursor.close()

        # Return json response
        return jsonify({"message": "User updated successfully 🫡", "status code": 200})

    except Exception as e:
        return jsonify({"Error": str(e), "status code": 500})
