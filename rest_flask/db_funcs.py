from flask import jsonify
from flask_jwt_extended import create_access_token
from .models import db
import datetime

def get_all(model):
    data = model.query.order_by(model.created_at).all()
    data_list = [d.serialize for d in data]
    return jsonify(data_list)
    
def get_user_all(model, email):
    data = model.query.filter_by(email=email).order_by(model.created_at)
    data_list = [d.serialize for d in data]
    return jsonify(data_list)

def get_one(model, id):
    item = model.query.filter_by(id=id).one()
    serialized_item = item.serialize
    return jsonify(serialized_item)

def get_user(model, email):
    item = model.query.filter_by(email=email).one()
    serialized_user = item.serialize
    return jsonify(serialized_user)

def create_item(model, **kwargs):
    item = model(**kwargs)
    db.session.add(item)
    commit_changes()
    serialized_item = item.serialize
    return jsonify(serialized_item)

def edit_item(model, id, **kwargs):
    item = model.query.filter_by(id=id).one()
    for attribute, updated_value in kwargs.items():
        if (updated_value):
            setattr(item, attribute, updated_value)
    commit_changes()
    serialized_item = item.serialize
    return jsonify(serialized_item)

def delete_item(model, id):
    item = model.query.filter_by(id=id).one()
    db.session.delete(item)
    commit_changes()
    deleted_blogpost = f'Blogpost Number {id}'
    response = {'deleted': deleted_blogpost}
    return jsonify(response)

def add_user(model, **kwargs):
    user = model(**kwargs)
    user.hash_password()
    db.session.add(user)
    commit_changes()
    serialized_item = user.serialize
    return jsonify(serialized_item)

def login_user(model, email_address, password):
    user = model.query.filter_by(email=email_address).one()
    authorized = model.check_password(user, password)

    if not email_address:
        return jsonify({"error": "Missing email parameter"}), 400
    if not password:
        return jsonify({"error": "Missing password parameter"}), 400
    if not authorized:
        return jsonify({"error": "Email or password invalid"}), 400

    # Identity can be any data that is json serializable
    expires = datetime.timedelta(days=7)
    access_token = create_access_token(identity=email_address, expires_delta=expires)
    return jsonify({
        'token': access_token,
        'user': user.serialize,
    }), 200

def validate_user(model, email_address, id):
    if not email_address:
        return False
    editor = email_address
    blogpost = model.query.filter_by(id=id).one()
    author = blogpost.email
    if (editor != author):
        return False
    return True

def commit_changes():
    db.session.commit()