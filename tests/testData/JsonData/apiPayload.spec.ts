import { test, expect } from '@playwright/test';
import { jsonPlaceHolder } from '../../../Utils/jsonPlaceHolder';


test('Replace placeholders in API payload', async () => {
    // Dynamic test data
    const testData = {
        username: 'Rahul pandey',
        email: 'rahul@gmail.com',
        password: 'Rahul@123',
        role: 'Admin',
        companyName: 'EY GDS',
        location: 'Bangalore',
        userId: '101',
        updatedName: 'Rahul Kumar',
        updatedEmail: 'rahul.kumar@gmail.com'
    };

    const finalPayload = jsonPlaceHolder(testData);

    console.log('Final API Payload:', finalPayload);
    expect(finalPayload).toMatchObject({
        createUser: {
            name: testData.username,
            email: testData.email,
            password: testData.password,
            role: testData.role,
            company: {
                name: testData.companyName,
                location: testData.location,
            },
        },
        updateUser: {
            userId: testData.userId,
            name: testData.updatedName,
            email: testData.updatedEmail,
        },
    });

    // // Send API request
    // const response = await request.post(
    //     'https://api.example.com/users',
    //     {
    //         data: finalPayload.createUser
    //     }
    // );

    // expect(response.status()).toBe(201);

});