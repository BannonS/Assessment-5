require('dotenv').config();

const { CONNECTION_STRING } = process.env;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  logging: false
});


module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists cities;
            drop table if exists countries;

            create table countries (
                country_id serial primary key, 
                name varchar
            );

            create table cities (
                city_id serial primary key,
                name varchar,
                rating integer,
                country_id integer
            );

            insert into countries (name)
            values ('Afghanistan'),
            ('Albania'),
            ('Algeria'),
            ('Andorra'),
            ('Angola'),
            ('Antigua and Barbuda'),
            ('Argentina'),
            ('Armenia'),
            ('Australia'),
            ('Austria'),
            ('Azerbaijan'),
            ('Bahamas'),
            ('Bahrain'),
            ('Bangladesh'),
            ('Barbados'),
            ('Belarus'),
            ('Belgium'),
            ('Belize'),
            ('Benin'),
            ('Bhutan'),
            ('Bolivia'),
            ('Bosnia and Herzegovina'),
            ('Botswana'),
            ('Brazil'),
            ('Brunei'),
            ('Bulgaria'),
            ('Burkina Faso'),
            ('Burundi'),
            ('Côte d''Ivoire'),
            ('Cabo Verde'),
            ('Cambodia'),
            ('Cameroon'),
            ('Canada'),
            ('Central African Republic'),
            ('Chad'),
            ('Chile'),
            ('China'),
            ('Colombia'),
            ('Comoros'),
            ('Congo'),
            ('Costa Rica'),
            ('Croatia'),
            ('Cuba'),
            ('Cyprus'),
            ('Czech Republic'),
            ('Democratic Republic of the Congo'),
            ('Denmark'),
            ('Djibouti'),
            ('Dominica'),
            ('Dominican Republic'),
            ('Ecuador'),
            ('Egypt'),
            ('El Salvador'),
            ('Equatorial Guinea'),
            ('Eritrea'),
            ('Estonia'),
            ('Eswatini'),
            ('Ethiopia'),
            ('Fiji'),
            ('Finland'),
            ('France'),
            ('Gabon'),
            ('Gambia'),
            ('Georgia'),
            ('Germany'),
            ('Ghana'),
            ('Greece'),
            ('Grenada'),
            ('Guatemala'),
            ('Guinea'),
            ('Guinea-Bissau'),
            ('Guyana'),
            ('Haiti'),
            ('Holy See'),
            ('Honduras'),
            ('Hungary'),
            ('Iceland'),
            ('India'),
            ('Indonesia'),
            ('Iran'),
            ('Iraq'),
            ('Ireland'),
            ('Israel'),
            ('Italy'),
            ('Jamaica'),
            ('Japan'),
            ('Jordan'),
            ('Kazakhstan'),
            ('Kenya'),
            ('Kiribati'),
            ('Kuwait'),
            ('Kyrgyzstan'),
            ('Laos'),
            ('Latvia'),
            ('Lebanon'),
            ('Lesotho'),
            ('Liberia'),
            ('Libya'),
            ('Liechtenstein'),
            ('Lithuania'),
            ('Luxembourg'),
            ('Madagascar'),
            ('Malawi'),
            ('Malaysia'),
            ('Maldives'),
            ('Mali'),
            ('Malta'),
            ('Marshall Islands'),
            ('Mauritania'),
            ('Mauritius'),
            ('Mexico'),
            ('Micronesia'),
            ('Moldova'),
            ('Monaco'),
            ('Mongolia'),
            ('Montenegro'),
            ('Morocco'),
            ('Mozambique'),
            ('Myanmar'),
            ('Namibia'),
            ('Nauru'),
            ('Nepal'),
            ('Netherlands'),
            ('New Zealand'),
            ('Nicaragua'),
            ('Niger'),
            ('Nigeria'),
            ('North Korea'),
            ('North Macedonia'),
            ('Norway'),
            ('Oman'),
            ('Pakistan'),
            ('Palau'),
            ('Palestine State'),
            ('Panama'),
            ('Papua New Guinea'),
            ('Paraguay'),
            ('Peru'),
            ('Philippines'),
            ('Poland'),
            ('Portugal'),
            ('Qatar'),
            ('Romania'),
            ('Russia'),
            ('Rwanda'),
            ('Saint Kitts and Nevis'),
            ('Saint Lucia'),
            ('Saint Vincent and the Grenadines'),
            ('Samoa'),
            ('San Marino'),
            ('Sao Tome and Principe'),
            ('Saudi Arabia'),
            ('Senegal'),
            ('Serbia'),
            ('Seychelles'),
            ('Sierra Leone'),
            ('Singapore'),
            ('Slovakia'),
            ('Slovenia'),
            ('Solomon Islands'),
            ('Somalia'),
            ('South Africa'),
            ('South Korea'),
            ('South Sudan'),
            ('Spain'),
            ('Sri Lanka'),
            ('Sudan'),
            ('Suriname'),
            ('Sweden'),
            ('Switzerland'),
            ('Syria'),
            ('Tajikistan'),
            ('Tanzania'),
            ('Thailand'),
            ('Timor-Leste'),
            ('Togo'),
            ('Tonga'),
            ('Trinidad and Tobago'),
            ('Tunisia'),
            ('Turkey'),
            ('Turkmenistan'),
            ('Tuvalu'),
            ('Uganda'),
            ('Ukraine'),
            ('United Arab Emirates'),
            ('United Kingdom'),
            ('United States of America'),
            ('Uruguay'),
            ('Uzbekistan'),
            ('Vanuatu'),
            ('Venezuela'),
            ('Vietnam'),
            ('Yemen'),
            ('Zambia'),
            ('Zimbabwe');

        `,).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    getCountries(req, res) {
        sequelize
          .query('SELECT * FROM countries')
          .then((result) => {
            const countries = result[0];
            res.status(200).json(countries);
          })
          .catch((error) => {
            console.error('Error fetching countries:', error);
            res.status(500).json({ error: 'Internal server error' });
          });
      },
    
    createCity(req, res) {
        const { name, rating, countryId } = req.body;

    const insertQuery = `
        INSERT INTO cities (name, rating, country_id)
        VALUES ('${name}', ${rating}, ${countryId})
        RETURNING *;
    `;
        sequelize
            .query(insertQuery)
            .then(([results, metadata]) => {
          
            console.log('City created successfully:', results);
            res.status(200).json({ message: 'City created successfully' });
            })
            .catch((error) => {
            
            console.error('Error creating city:', error);
            res.status(500).json({ error: 'Error creating city' });
        })
    },

    getCities(req, res) {
        sequelize
        .query('SELECT * FROM cities ORDER BY rating DESC')
        .then((result) => {
            const cities = result[0];
            res.status(200).json(cities)
        })
        .catch((error) => {
            console.log('Error fetching countries:', error);
            res.status(500).json({ error: 'Internal server error' });
        })
     },

     deleteCity(req, res) {
        const { id } = req.params;
      
        const deleteQuery = `
          DELETE FROM cities
          WHERE city_id = ${id};
        `;
      
        sequelize
          .query(deleteQuery)
          .then(() => {
            res.status(200).json({ message: 'City deleted successfully' });
          })
          .catch((error) => {
            console.log('Error deleting city:', error);
            res.status(500).json({ error: 'Internal server error' });
          });
      }










}