FROM mongo

COPY rushing.json /rushing.json
CMD mongoimport --host mongodb --db ts-nfl-rushing --collection RushingStats --type json --file /rushing.json --jsonArray