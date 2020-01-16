const axios = require('axios');


function uploadMember(member) {
    return axios.post('http://localhost:5000/my-form-route', member);
}

async function test() {
    const ikey = {
        name: 'Ikey Benzaken', 
        phone: 7327595582,
        dads_number: 9175898959,
        moms_number: 7189868587,
    }
    const jack = {
        name: 'Jack Benzaken',
        phone: 9175898959,
        moms_number: 1234,
        childrens_numbers: [7327595582]
    }
    await uploadMember(ikey);
    await uploadMember(jack);
}

test();