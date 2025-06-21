
export const userDataGym = {
    tenantId: 1,
    userId: 1,
    userRole: "user",
    userType: "gym",
    settings: {
        "language": "en",
        "currency": "USD",
        "theme": "light",
        "notifications": true,
        "emailNotifications": true,
    },
    userInfo: {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+40722222222",
        "address": "Strada Transylvania, nr. 1, Cluj-Napoca",
        "city": "Cluj-Napoca",
    },
    activePackage: {
        "id": 1,
        "name": "Premium Package",
        "description": "Premium package description",
        "price": 100,
        "currency": "USD",
        "status": "active",
        "startDate": "2021-01-01",
    }
}

export const userDataHotel = {
    tenantId: 1,
    userId: 1,
    userRole: "user",
    userType: "hotel",
    settings: {
        "language": "en",
        "currency": "USD",
        "theme": "light",
        "notifications": true,
        "emailNotifications": true,
    }, 
    userInfo: {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+40722222222",
        "address": "Strada Transylvania, nr. 1, Cluj-Napoca",
        "city": "Cluj-Napoca",
    },
    activeBookings: [
        {
            "id": 1,
            "roomId": 1,
            "roomName": "Room 1",
            "roomType": "Single",
            "roomPrice": 100,
            "roomCurrency": "USD",
            "roomStatus": "active",
            "roomStartDate": "2021-01-01",
        },
        {
            "id": 2,
            "roomId": 2,
            "roomName": "Room 2",
            "roomType": "Double",
            "roomPrice": 200,
            "roomCurrency": "USD",
            "roomStatus": "active",
            "roomStartDate": "2021-01-01",
        }
    ],
}


export const userDataClinic = {
    tenantId: 1,
    userId: 1,
    userRole: "user",
    userType: "clinic",
    settings: {
        "language": "en",
        "currency": "USD",
        "theme": "light",
    },
    userInfo: {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+40722222222",
        "address": "Strada Transylvania, nr. 1, Cluj-Napoca",
        "city": "Cluj-Napoca",
    },
    followingAppointment: [
        {
            "id": 1,
            "appointmentName": "Appointment 1",
            "appointmentDate": "2021-01-01",
            "appointmentTime": "10:00",
            "appointmentStatus": "upcoming",
            "treatment": "Treatment 1",
            "treatmentPrice": 100,
            "treatmentDuration": 30,
            "treatmentColor": "#000000",
            "medicName": "Dr. John Doe",
            "medicSpecialization": "Cardiologist",
            "medicId": 1,
            "medicImage": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        },
    ]
}