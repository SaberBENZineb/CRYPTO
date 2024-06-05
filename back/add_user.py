from flask import jsonify, request
import os
import json

def load_data(users_data_file_path):
    # Load existing users data from the file
    if os.path.exists(users_data_file_path):
        with open(users_data_file_path, 'r') as file:
            return json.load(file)
    else:
        return []

def save_to_file(users_data_file_path, users):
    with open(users_data_file_path, 'w') as file:
        json.dump(users, file, indent=2)

def AddUser(data):
    users_data_file_path = os.path.join(os.path.dirname(__file__), 'users.json')
    email = data['email']
    password = data['pass_hashed']
    users = load_data(users_data_file_path)
    if not email or not password:
        return {'success': False, 'message': 'Email and password are required','status':400}
    for user in users:
        if user.get('email') == email:
            if user.get('password') == password:
                return {'success': True, 'message': 'Logged successfuly', 'status':200}
            else:
                return {'success': False, 'message': 'Email already exists', 'status':400}
    if '@'in email and email.index('@')>1:
            new_user = {'email': email, 'password': password}
            users.append(new_user)
            save_to_file(users_data_file_path, users)
    else:
        return {'success': False, 'message': 'invalid Email', 'status':400}
    print('Successfully created !!')
    return {'success': True, 'message': 'Account created successfuly', 'status':201}
