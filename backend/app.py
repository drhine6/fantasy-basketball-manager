from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
app = Flask(__name__)
api = Api(app)

class Players(Resource): 
    def get(self):
        data = pd.read_csv('team.csv')  # read CSV
        data = data.to_dict()  # convert dataframe to dictionary
        return {'data': data}, 200  # return data and 200 OK code

    def post(self):
        parser = reqparse.RequestParser()  # initialize
        
        parser.add_argument('id', required=True)  # add args
        parser.add_argument('first_name', required=True)
        parser.add_argument('last_name', required=True)
        
        args = parser.parse_args()  # parse arguments to dictionary
        
        # create new dataframe containing new values
        new_data = pd.DataFrame({
            'id': args['userId'],
            'fist_name': args['name'],
            'last_name': args['city'],
            'locations': [[]]
        })
        # read our CSV
        data = pd.read_csv('team.csv')
        # add the newly provided values
        data = data.append(new_data, ignore_index=True)
        # save back to CSV
        data.to_csv('team.csv', index=False)
        return {'team': data.to_dict()}, 200  # return data with 200 OK
vi

class FantasyTeams(Resource):
    def get(self):
        data = pd.read_csv('team.csv')  # read CSV
        data = data.to_dict()  # convert dataframe to dictionary
        return {'data': data}, 200  # return data and 200 OK code

api.add_resource(Teams, '/teams')  # '/users' is our entry point

if __name__ == '__main__':
    app.run()  # run our Flask app