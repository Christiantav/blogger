from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

import logging

from .db_funcs import add_user, create_item, delete_item, edit_item, get_all, get_user_all, get_one, login_user, validate_user
from .models import BlogPost, User
from . import create_app, db

logging.basicConfig(level=logging.DEBUG)

app = create_app()
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# /blog routes are protected, /blogposts are not

@app.route('/')
@app.route('/blogposts', methods=['GET'])
def blogposts_func():
    if request.method == 'GET':
        return get_all(BlogPost)

@app.route('/blogpost/<int:blogpost_id>', methods=['GET'])
def blogpost_id_func(blogpost_id):
    if request.method == 'GET':
        return get_one(BlogPost, blogpost_id)

@app.route('/home/blogposts', methods=['GET'])
@jwt_required
def home_blogposts_func():
    if request.method == 'GET':
        email_address = get_jwt_identity()
        app.logger.info(f"email: {email_address}")
        if not email_address:
            return jsonify({"msg": "Missing authentication parameter"}), 400
        res = get_user_all(BlogPost, email_address)
        app.logger.info(f"res: {res}")
        return res

@app.route('/blog', methods=['POST'])
@jwt_required
def blog_func():
    if request.method == 'POST':
        request_body = request.get_json()
        email_address = get_jwt_identity()
        if not email_address:
            return jsonify({"msg": "Missing authentication parameter"}), 400
        title = request_body.get('title', '')
        description = request_body.get('description', '')
        return create_item(BlogPost, title=title, email=email_address, description=description)

@app.route('/blog/<int:blogpost_id>', methods=['PUT', 'DELETE'])
@jwt_required
def blog_id_func(blogpost_id):
    email_address = get_jwt_identity()
    valid = validate_user(BlogPost, email_address, blogpost_id)
    if (valid == False):
        return jsonify({"error": "Resource does not exist for this user"}), 400
    if request.method == 'PUT':
        request_body = request.get_json()
        new_title = request_body.get('title', '')
        new_description = request_body.get('description', '')
        return edit_item(BlogPost, blogpost_id, title=new_title, description=new_description)
    elif request.method == 'DELETE':
        if not email_address:
            return jsonify({"msg": "Missing authentication parameter"}), 400
        return delete_item(BlogPost, blogpost_id)

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        request_body = request.get_json()

        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400

        email = request.json.get('email', '')
        password = request.json.get('password', '')
        return login_user(User, email, password)

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        request_body = request.get_json()
        email = request_body.get('email', '')
        first_name = request_body.get('first_name', '')
        last_name = request_body.get('last_name', '')
        password = request_body.get('password', '')
        app.logger.info(email)
        return add_user(User, email=email, first_name=first_name, last_name=last_name, password=password)

        # return {'id': str(id)}, 200
