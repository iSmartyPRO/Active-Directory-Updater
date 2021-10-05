# Описание Active Directory Updater
API для обновления данных в Active Directory

Примечание:
* необходимо использовать на компьютере с ОС Windows, с установленным пакетом RSAT;
* Для того чтобы данные обновлялись необходимо настроить соответствующие права при запуске службы.

## Доступныe точки входа

### GET: /api/
простой ответ с описанием

### GET: /api/computer
простой ответ с описанием

### PATCH: /api/computer
обновление данных в "Компьютер"

Доступные варианты

type: updateDescription
```
{
    "type": "updateDescription",
    "computername": "PC-038",
    "description": "Ilias.Aidar, 05.10.2021 12:31, lock"
}
```
в моем случае в description записывается информация о пользователе (sAMAccountName) совершивший вход на данный компьютер, с указанием времени и типа события, которое повлекло обновление данных в description.

# Как установить и запустить

### устанавливаем все зависимости
```
npm install
```

### Конфигурация
Необходимо скопировать файл настроек config/index.sample.js в config/index.js
При необходимости изменить номер порта, указав свободный порт.

### устанавливаем как сервис (автоматически запуститься)
```
npm run install
```

### для удаления из служб
```
npm run uninstall
```