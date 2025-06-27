import pandas as pd
data = {
    'Name': ['Alice', 'Bob','gghh','hgdgd'],
    'Age': [23, 22,45,30],
    'City': ['Delhi','ludhiana','chandigarh','nan']
}
df=pd.DataFrame(data)
print(df)
print(df.shape)
print(df.describe())

df["marks"]=[23,56,34,45]
df=df.drop("marks",axis=1)
print(df.isnull())