import pandas as pd
from flask import Flask, render_template, jsonify
import sqlite3
from sqlalchemy import create_engine


# def create_connection(db_file):
#     conn=None
#     try:
#         conn=sqlite3.connect(db_file)
#     except Error as e:
#         print(e)
#     return conn
# df = pd.read_csv("PieData.csv")
# connection = create_connection("PieData.db")
# df.to_sql('Pie_Data',connection,if_exists='replace')
# connection.close()

app = Flask(__name__)

@app.route('/')
def index():

    return render_template('index.html')

@app.route('/get_PieChart')
def get_dataPie():
    data = Pie_Data()
    return jsonify(data)
#Done
@app.route('/get_BarChart')
def get_dataBar():
    data = Bar_Price_Data()
    return jsonify(data)


@app.route('/get_SellerBarChart')
def get_ChartSeller():

    data = get_Best_Sellers()
    return jsonify(data)
@app.route('/get_Sales_Curve')
def get_CurveSales():

    data = get_Sales()
    return jsonify(data)
@app.route('/get_LineSalesAndPurchasing')
def get_dataDiffrence():
    data = get_Diffrence()

    return jsonify(data)


#Done
def get_Sales():
    db_url = 'sqlite:///SalesData.db'
    engine = create_engine(db_url,echo=True)
    df = pd.read_sql('select * from Sales_Data',engine)
    print(df)
    data = df.to_dict(orient='records')
    return data
#Done
def get_Diffrence():
    db_url = 'sqlite:///Diff.db'
    engine = create_engine(db_url,echo=True)
    df = pd.read_sql('select * from Diff_Data',engine)
    print(df)
    data = df.to_dict(orient='records')
    return data
#Done
def get_Best_Sellers():
    db_url = 'sqlite:///Best Sellers.db'
    engine = create_engine(db_url,echo=True)
    df = pd.read_sql('select * from Best_Sellers',engine)
    df['Total'] = pd.to_numeric(df['Total'], errors='coerce')
    seller_totals_series = df.groupby('Seller')['Total'].sum()
    data_list = seller_totals_series.to_dict()
    seller_totals_df = seller_totals_series.reset_index()
    data = seller_totals_df.to_dict(orient='records')
    return data



def Pie_Data():
    db_url = 'sqlite:///PieData.db'
    engine = create_engine(db_url,echo=True)
    df = pd.read_sql('select * from Pie_Data',engine)
    #df = pd.read_csv('PieData.csv')
    return df.to_dict(orient='records')

#Done
def Bar_Price_Data():
    
    db_url = 'sqlite:///Prices of products.db'
    engine = create_engine(db_url,echo=True)
    df = pd.read_sql('select * from Products_Prices',engine)
    return df.to_dict(orient='records')



if __name__ == '__main__':
    app.run(debug=True)
