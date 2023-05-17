const ApiError = require("../error/ApiError");
const {Game, MinRequirement, RecRequirement, User} = require("../models/models");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const gameData =
    [
        {
            game: {
                title: "Assassin\s Creed Valhalla",
                description: "Assassin\s Creed Valhalla — игра в жанре action/RPG, разработанная студией Ubisoft Montreal и изданная Ubisoft. Игра была выпущена 10 ноября 2020 года на платформах PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, Microsoft Windows и Stadia.",
                platform: "PS4, PS5, Xbox One, Xbox Series X/S, PC, Stadia",
                img: "gameImage.jpg",
                trailer: "https://www.youtube.com/watch?v=ssrDYcCi_4I",
            },
            minRequirement: {
                cpu: "Intel Core i3",
                ram: "4GB",
                os: "Windows 10",
                space: "250GB"
            },
            recRequirement: {
                cpu: "Intel Core i5",
                ram: "8GB",
                os: "Windows 10",
                space: "256GB"
            }
        },
        {
            game: {
                "title": "The Witcher 3: Wild Hunt",
                "description": "The Witcher 3: Wild Hunt — игра в жанре action/RPG, разработанная и изданная польской студией CD Projekt RED. Игра была выпущена 19 мая 2015 года на платформах PlayStation 4, Xbox One и Microsoft Windows.",
                "platform": "PS4, Xbox One, PC",
                "img": "gameImage.jpg",
                "trailer": "https://www.youtube.com/watch?v=c0i88t0Kacs",
            },
            minRequirement: {
                "cpu": "AMD Ryzen 3",
                "ram": "8GB",
                "os": "Windows 7",
                "space": "500GB"
            },
            recRequirement: {
                "cpu": "AMD Ryzen 7",
                "ram": "16GB",
                "os": "Windows 11",
                "space": "512GB"
            }
        },
        {
            game: {
                "title": "Cyberpunk 2077",
                "description": "Cyberpunk 2077 — игра в жанре action/RPG, разработанная и изданная польской студией CD Projekt RED. Игра была выпущена 10 декабря 2020 года на платформах PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, Microsoft Windows и Stadia.",
                "platform": "PS4, PS5, Xbox One, Xbox Series X/S, PC, Stadia",
                "img": "gameImage.jpg",
                "trailer": "https://www.youtube.com/watch?v=qIcTM8WXFjk",
            },
            minRequirement: {
                "cpu": "Intel Pentium",
                "ram": "2GB",
                "os": "Ubuntu 18.04",
                "space": "120GB"
            },
            recRequirement: {
                "cpu": "Intel Core i7",
                "ram": "12GB",
                "os": "MacOS",
                "space": "1TB"
            }
        },
        {
            game: {
                "title": "Grand Theft Auto V",
                "description": "Grand Theft Auto V — игра в жанре action/автосимулятор, разработанная студией Rockstar North и изданная компанией Rockstar Games. Игра была выпущена 17 сентября 2013 года на платформах PlayStation 3 и Xbox 360, а затем 18 ноября 2014 года на PlayStation 4 и Xbox One, и наконец 14 апреля 2015 года на PC.",
                "platform": "PS3, Xbox 360, PS4, Xbox One, PC",
                "img": "gameImage.jpg",
                "trailer": "https://www.youtube.com/watch?v=qIcTM8WXFjk",
            },
            minRequirement: {
                "cpu": "AMD Athlon II",
                "ram": "4GB",
                "os": "Windows 8.1",
                "space": "320GB"
            },
            recRequirement: {
                "cpu": "AMD Ryzen 5",
                "ram": "8GB",
                "os": "Linux",
                "space": "256GB"
            },
        },
        {
            game: {
                "title": "Red Dead Redemption 2",
                "description": "Red Dead Redemption 2 — игра в жанре action/adventure, разработанная и изданная компанией Rockstar Games. Игра была выпущена 26 октября 2018 года на платформах PlayStation 4, Xbox One и Microsoft Windows.",
                "platform": "PS4, Xbox One, PC",
                "img": "gameImage.jpg",
                "trailer": "https://www.youtube.com/watch?v=gmA6MrX81z4",
            },
            minRequirement: {
                "cpu": "Intel Core i5",
                "ram": "8GB",
                "os": "macOS Mojave",
                "space": "500GB"
            },
            recRequirement: {
                "cpu": "Intel Core i9",
                "ram": "32GB",
                "os": "Windows 10",
                "space": "2TB"
            },
        },
        {
            game: {
                "title": "FIFA 21",
                "description": "FIFA 21 — футбольный симулятор, разработанный и изданный компанией Electronic Arts. Игра была выпущена 9 октября 2020 года на платформах PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, Nintendo Switch и Microsoft Windows.",
                "platform": "PS4, PS5, Xbox One, Xbox Series X/S, Nintendo Switch, PC",
                "img": "gameImage.jpg",
                "trailer": "https://www.youtube.com/watch?v=_z-4y8SBxno",
            },
            minRequirement: {
                "cpu": "AMD Ryzen 5",
                "ram": "16GB",
                "os": "Windows 11",
                "space": "1TB"
            },
            recRequirement: {
                "cpu": "AMD Ryzen 9",
                "ram": "16GB",
                "os": "Windows 11",
                "space": "512GB"
            },
        },
        {
            game: {
                "title": "Minecraft",
                "description": "Minecraft — песочница с открытым миром, разработанная и изданная компанией Mojang Studios. Игра была выпущена 18 ноября 2011 года на платформах PlayStation 4, Xbox One, Nintendo Switch, Android, iOS и Microsoft Windows.",
                "platform": "PS4, Xbox One, Nintendo Switch, Android, iOS, PC",
                "img": "gameImage.jpg",
                "trailer": "https://www.youtube.com/watch?v=MmB9b5njVbA",
            },
            minRequirement: {
                "cpu": "Intel Core 2 Duo",
                "ram": "4GB",
                "os": "Windows Vista",
                "space": "250GB"
            },
            recRequirement: {
                "cpu": "Intel Core i5",
                "ram": "8GB",
                "os": "Windows 10",
                "space": "512GB"
            },
        },
        {
            game: {
                "title": "The Legend of Zelda: Breath of the Wild",
                "description": "The Legend of Zelda: Breath of the Wild — приключенческая игра, разработанная и изданная компанией Nintendo. Игра была выпущена 3 марта 2017 года на платформе Nintendo Switch.",
                "platform": "Nintendo Switch",
                "img": "gameImage.jpg",
                "trailer": "https://www.youtube.com/watch?v=zw47_q9wbBE",
            },
            minRequirement: {
                "cpu": "AMD A10",
                "ram": "8GB",
                "os": "Windows 10",
                "space": "500GB"
            },
            recRequirement: {
                "cpu": "AMD Ryzen 7",
                "ram": "12GB",
                "os": "Linux",
                "space": "1TB"
            },
        },
    ]

const users = [
    {
        login: "user",
        email: "user@mail.com",
        password: "$2b$07$uIwOOaHec//zgRdJ/AQvJehrwk4qWw.qthABSBXABf5A5ZiV8zqHm",
        img: "unauthorizedUser.png",
        role: "USER",
    },
    {
        login: "admin",
        email: "admin@mail.com",
        password: "$2b$07$uIwOOaHec//zgRdJ/AQvJehrwk4qWw.qthABSBXABf5A5ZiV8zqHm",
        img: "unauthorizedUser.png",
        role: "ADMIN",
    }
]
class InitController {
    async create(req, res, next) {
        try {
            for (const data of gameData) {
                const {game, minRequirement, recRequirement} = data;
                const newGame = await Game.create({...game})
                MinRequirement.create({...minRequirement, gameId: newGame.id})
                RecRequirement.create({...recRequirement, gameId: newGame.id})
            }

            console.log('Массив Game успешно инициализирован.');
            for (const user of users) {
                User.create({...user});
            }
            console.log('Массив User успешно инициализирован.');

            return res.json({message: "инициализация прошла успешно"})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new InitController()
