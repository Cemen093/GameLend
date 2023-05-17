import {makeAutoObservable} from "mobx";

export default class DataStore {
    constructor() {
        this._games = [
            {
                "id": 1,
                "title": "Assassins Creed Valhalla",
                "description": "Assassins Creed Valhalla — игра в жанре action/RPG, разработанная студией Ubisoft Montreal и изданная Ubisoft. Игра была выпущена 10 ноября 2020 года на платформах PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, Microsoft Windows и Stadia.",
                "platforms": ["PS4", "PS5", "Xbox One", "Xbox Series X/S", "PC", "Stadia"],
                "price": "1500",
                "img": "https://upload.wikimedia.org/wikipedia/ru/thumb/7/7c/Warhammer40000SpaceMarinecover.jpg/411px-Warhammer40000SpaceMarinecover.jpg",
                "trailer": "https://www.youtube.com/watch?v=ssrDYcCi_4I",
                "createdAt": "2023-05-12T02:03:11.928Z",
                "updatedAt": "2023-05-12T02:03:11.928Z",
                "min_requirement": {
                    "id": 1,
                    "cpu": "Intel Core i3",
                    "ram": "4GB",
                    "os": "Windows 10",
                    "space": "250GB",
                    "createdAt": "2023-05-12T02:03:11.943Z",
                    "updatedAt": "2023-05-12T02:03:11.943Z",
                    "gameId": 1
                },
                "rec_requirement": {
                    "id": 1,
                    "cpu": "Intel Core i5",
                    "ram": "8GB",
                    "os": "Windows 10",
                    "space": "256GB",
                    "createdAt": "2023-05-12T02:03:11.943Z",
                    "updatedAt": "2023-05-12T02:03:11.943Z",
                    "gameId": 1
                }
            },
            {
                "id": 2,
                "title": "The Witcher 3: Wild Hunt",
                "description": "The Witcher 3: Wild Hunt — игра в жанре action/RPG, разработанная и изданная польской студией CD Projekt RED. Игра была выпущена 19 мая 2015 года на платформах PlayStation 4, Xbox One и Microsoft Windows.",
                "platforms": ["PS4", "Xbox One", "PC"],
                "price": "1500",
                "img": "https://upload.wikimedia.org/wikipedia/ru/thumb/7/7c/Warhammer40000SpaceMarinecover.jpg/411px-Warhammer40000SpaceMarinecover.jpg",
                "trailer": "https://www.youtube.com/watch?v=c0i88t0Kacs",
                "createdAt": "2023-05-12T02:03:11.943Z",
                "updatedAt": "2023-05-12T02:03:11.943Z",
                "min_requirement": {
                    "id": 2,
                    "cpu": "AMD Ryzen 3",
                    "ram": "8GB",
                    "os": "Windows 7",
                    "space": "500GB",
                    "createdAt": "2023-05-12T02:03:11.958Z",
                    "updatedAt": "2023-05-12T02:03:11.958Z",
                    "gameId": 2
                },
                "rec_requirement": {
                    "id": 2,
                    "cpu": "AMD Ryzen 7",
                    "ram": "16GB",
                    "os": "Windows 11",
                    "space": "512GB",
                    "createdAt": "2023-05-12T02:03:11.959Z",
                    "updatedAt": "2023-05-12T02:03:11.959Z",
                    "gameId": 2
                }
            },
            {
                "id": 3,
                "title": "Cyberpunk 2077",
                "description": "Cyberpunk 2077 — игра в жанре action/RPG, разработанная и изданная польской студией CD Projekt RED. Игра была выпущена 10 декабря 2020 года на платформах PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, Microsoft Windows и Stadia.",
                "platforms": ["PS4", "PS5", "Xbox One", "Xbox Series X/S", "PC", "Stadia"],
                "price": "1500",
                "img": "https://upload.wikimedia.org/wikipedia/ru/thumb/7/7c/Warhammer40000SpaceMarinecover.jpg/411px-Warhammer40000SpaceMarinecover.jpg",
                "trailer": "https://www.youtube.com/watch?v=qIcTM8WXFjk",
                "createdAt": "2023-05-12T02:03:11.959Z",
                "updatedAt": "2023-05-12T02:03:11.959Z",
                "min_requirement": {
                    "id": 3,
                    "cpu": "Intel Pentium",
                    "ram": "2GB",
                    "os": "Ubuntu 18.04",
                    "space": "120GB",
                    "createdAt": "2023-05-12T02:03:11.972Z",
                    "updatedAt": "2023-05-12T02:03:11.972Z",
                    "gameId": 3
                },
                "rec_requirement": {
                    "id": 3,
                    "cpu": "Intel Core i7",
                    "ram": "12GB",
                    "os": "MacOS",
                    "space": "1TB",
                    "createdAt": "2023-05-12T02:03:11.972Z",
                    "updatedAt": "2023-05-12T02:03:11.972Z",
                    "gameId": 3
                }
            },
            {
                "id": 4,
                "title": "Grand Theft Auto V",
                "description": "Grand Theft Auto V — игра в жанре action/автосимулятор, разработанная студией Rockstar North и изданная компанией Rockstar Games. Игра была выпущена 17 сентября 2013 года на платформах PlayStation 3 и Xbox 360, а затем 18 ноября 2014 года на PlayStation 4 и Xbox One, и наконец 14 апреля 2015 года на PC.",
                "platforms": ["PS3", "Xbox 360", "PS4", "Xbox One", "PC"],
                "price": "1500",
                "img": "https://upload.wikimedia.org/wikipedia/ru/thumb/7/7c/Warhammer40000SpaceMarinecover.jpg/411px-Warhammer40000SpaceMarinecover.jpg",
                "trailer": "https://www.youtube.com/watch?v=qIcTM8WXFjk",
                "createdAt": "2023-05-12T02:03:11.972Z",
                "updatedAt": "2023-05-12T02:03:11.972Z",
                "min_requirement": {
                    "id": 4,
                    "cpu": "AMD Athlon II",
                    "ram": "4GB",
                    "os": "Windows 8.1",
                    "space": "320GB",
                    "createdAt": "2023-05-12T02:03:11.984Z",
                    "updatedAt": "2023-05-12T02:03:11.984Z",
                    "gameId": 4
                },
                "rec_requirement": {
                    "id": 4,
                    "cpu": "AMD Ryzen 5",
                    "ram": "8GB",
                    "os": "Linux",
                    "space": "256GB",
                    "createdAt": "2023-05-12T02:03:11.985Z",
                    "updatedAt": "2023-05-12T02:03:11.985Z",
                    "gameId": 4
                }
            },
            {
                "id": 5,
                "title": "Red Dead Redemption 2",
                "description": "Red Dead Redemption 2 — игра в жанре action/adventure, разработанная и изданная компанией Rockstar Games. Игра была выпущена 26 октября 2018 года на платформах PlayStation 4, Xbox One и Microsoft Windows.",
                "platforms": ["PS4", "Xbox One", "PC"],
                "price": "1500",
                "img": "https://upload.wikimedia.org/wikipedia/ru/thumb/7/7c/Warhammer40000SpaceMarinecover.jpg/411px-Warhammer40000SpaceMarinecover.jpg",
                "trailer": "https://www.youtube.com/watch?v=gmA6MrX81z4",
                "createdAt": "2023-05-12T02:03:11.985Z",
                "updatedAt": "2023-05-12T02:03:11.985Z",
                "min_requirement": {
                    "id": 5,
                    "cpu": "Intel Core i5",
                    "ram": "8GB",
                    "os": "macOS Mojave",
                    "space": "500GB",
                    "createdAt": "2023-05-12T02:03:11.999Z",
                    "updatedAt": "2023-05-12T02:03:11.999Z",
                    "gameId": 5
                },
                "rec_requirement": {
                    "id": 5,
                    "cpu": "Intel Core i9",
                    "ram": "32GB",
                    "os": "Windows 10",
                    "space": "2TB",
                    "createdAt": "2023-05-12T02:03:11.999Z",
                    "updatedAt": "2023-05-12T02:03:11.999Z",
                    "gameId": 5
                }
            },
            {
                "id": 6,
                "title": "FIFA 21",
                "description": "FIFA 21 — футбольный симулятор, разработанный и изданный компанией Electronic Arts. Игра была выпущена 9 октября 2020 года на платформах PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, Nintendo Switch и Microsoft Windows.",
                "platforms": ["PS4", "PS5", "Xbox One", "Xbox Series X/S", "Nintendo Switch", "PC"],
                "price": "1500",
                "img": "https://upload.wikimedia.org/wikipedia/ru/thumb/7/7c/Warhammer40000SpaceMarinecover.jpg/411px-Warhammer40000SpaceMarinecover.jpg",
                "trailer": "https://www.youtube.com/watch?v=_z-4y8SBxno",
                "createdAt": "2023-05-12T02:03:11.999Z",
                "updatedAt": "2023-05-12T02:03:11.999Z",
                "min_requirement": {
                    "id": 6,
                    "cpu": "AMD Ryzen 5",
                    "ram": "16GB",
                    "os": "Windows 11",
                    "space": "1TB",
                    "createdAt": "2023-05-12T02:03:12.009Z",
                    "updatedAt": "2023-05-12T02:03:12.009Z",
                    "gameId": 6
                },
                "rec_requirement": {
                    "id": 6,
                    "cpu": "AMD Ryzen 9",
                    "ram": "16GB",
                    "os": "Windows 11",
                    "space": "512GB",
                    "createdAt": "2023-05-12T02:03:12.009Z",
                    "updatedAt": "2023-05-12T02:03:12.009Z",
                    "gameId": 6
                }
            },
            {
                "id": 7,
                "title": "Minecraft",
                "description": "Minecraft — песочница с открытым миром, разработанная и изданная компанией Mojang Studios. Игра была выпущена 18 ноября 2011 года на платформах PlayStation 4, Xbox One, Nintendo Switch, Android, iOS и Microsoft Windows.",
                "platforms": ["PS4", "Xbox One", "Nintendo Switch", "Android", "iOS", "PC"],
                "price": "1500",
                "img": "https://upload.wikimedia.org/wikipedia/ru/thumb/7/7c/Warhammer40000SpaceMarinecover.jpg/411px-Warhammer40000SpaceMarinecover.jpg",
                "trailer": "https://www.youtube.com/watch?v=MmB9b5njVbA",
                "createdAt": "2023-05-12T02:03:12.009Z",
                "updatedAt": "2023-05-12T02:03:12.009Z",
                "min_requirement": {
                    "id": 7,
                    "cpu": "Intel Core 2 Duo",
                    "ram": "4GB",
                    "os": "Windows Vista",
                    "space": "250GB",
                    "createdAt": "2023-05-12T02:03:12.016Z",
                    "updatedAt": "2023-05-12T02:03:12.016Z",
                    "gameId": 7
                },
                "rec_requirement": {
                    "id": 7,
                    "cpu": "Intel Core i5",
                    "ram": "8GB",
                    "os": "Windows 10",
                    "space": "512GB",
                    "createdAt": "2023-05-12T02:03:12.016Z",
                    "updatedAt": "2023-05-12T02:03:12.016Z",
                    "gameId": 7
                }
            },
            {
                "id": 8,
                "title": "The Legend of Zelda: Breath of the Wild",
                "description": "The Legend of Zelda: Breath of the Wild — приключенческая игра, разработанная и изданная компанией Nintendo. Игра была выпущена 3 марта 2017 года на платформе Nintendo Switch.",
                "platforms": ["Nintendo Switch"],
                "price": "1500",
                "img": "https://upload.wikimedia.org/wikipedia/ru/thumb/7/7c/Warhammer40000SpaceMarinecover.jpg/411px-Warhammer40000SpaceMarinecover.jpg",
                "trailer": "https://www.youtube.com/watch?v=zw47_q9wbBE",
                "createdAt": "2023-05-12T02:03:12.016Z",
                "updatedAt": "2023-05-12T02:03:12.016Z",
                "min_requirement": {
                    "id": 8,
                    "cpu": "AMD A10",
                    "ram": "8GB",
                    "os": "Windows 10",
                    "space": "500GB",
                    "createdAt": "2023-05-12T02:03:12.024Z",
                    "updatedAt": "2023-05-12T02:03:12.024Z",
                    "gameId": 8
                },
                "rec_requirement": {
                    "id": 8,
                    "cpu": "AMD Ryzen 7",
                    "ram": "12GB",
                    "os": "Linux",
                    "space": "1TB",
                    "createdAt": "2023-05-12T02:03:12.024Z",
                    "updatedAt": "2023-05-12T02:03:12.024Z",
                    "gameId": 8
                }
            }
        ]
        this._platforms = ["PC", "Playstation"]
        this._sort = ["price", "ascending price", "descending rating"]
        makeAutoObservable(this)
    }

    setGames(value) {
        this._games = value;
    }

    set Platforms(value) {
        this._platforms = value;
    }

    setSort(value) {
        this._sort = value;
    }

    get games() {
        return this._games;
    }

    get platforms() {
        return this._platforms;
    }

    get sort() {
        return this._sort;
    }
}
