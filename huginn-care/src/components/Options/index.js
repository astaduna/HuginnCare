export const beforeOptions = [
    { label: 'Þjónustuþega sett mörk', value: 'Þjónustuþega sett mörk' },
    { label: 'Sleppa úr aðstæðum eða verkefnum', value: 'Sleppa úr aðstæðum eða verkefnum' },
    { label: 'Áreiti frá öðrum', value: 'Áreiti frá öðrum' },
    { label: 'Annað', value: 'Annað' }
];

export const categoryOptionsA = [
    { label: 'Dagsskýrsla', value: 'day' },
    { label: 'Atvikaskýrsla', value: 'incident' }
];

export const categoryOptionsB = [
    { label: 'Allar Tegundir', value: '' },
    ...categoryOptionsA,
    { label: 'Atvikaskýrslur með líkamlegu inngripi', value: 'coercion' }
];

export const clientOptionsA = (clients) => 
    clients.map(client => ({
        label: client.name,
        value: client.id
    })).sort((a, b) => a.label.localeCompare(b.label));

export const clientOptionsB = (clients) => [{ 
    label: 'Allir Þjónustuþegar', 
    value: '' 
},
...clientOptionsA(clients)];

export const departmentOptionsA = (departments) =>  
    departments.map(department => ({
        label: department.name,
        value: department.id
    })).sort((a, b) => a.label.localeCompare(b.label));

export const departmentOptionsB = (departments) => [{ 
    label: 'Allar Deildir', 
    value: '' 
},
...departmentOptionsA(departments)];

export const orderOptions = [
    { label: 'Nafn A-Ö', value: 'Nafn A-Ö' },
    { label: 'Nafn Ö-A', value: 'Nafn Ö-A' },
    { label: 'Deild A-Ö', value: 'Deild A-Ö' },
    { label: 'Deild Ö-A', value: 'Deild Ö-A' }
];

export const pageOptions = [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '100', value: '100' }
];

export const shiftOptions = [
    { label: 'Dagvakt', value: 'day' },
    { label: 'Kvöldvakt', value: 'evening' },
    { label: 'Næturvakt', value: 'night' }
];

export const typeOptions = [
    { label: 'Slys', value: 'Slys' },
    { label: 'Árás', value: 'Árás' },
    { label: 'Kynferðisleg áreitni', value: 'Kynferðisleg áreitni' },
    { label: 'Ógnandi hegðun', value: 'Ógnandi hegðun' },
    { label: 'Annað', value: 'Annað' }
];

export const userOptionsA = (users) => 
    users.map(user => ({
        label: user.name,
        value: user.id
    })).sort((a, b) => a.label.localeCompare(b.label));

export const userOptionsB = (users) => [{ 
    label: 'Allir Notendur', 
    value: '' 
},
...userOptionsA(users)];

export const colorOptions = [
    { label: 'Hvítur', value: '#ffffff' },
    { label: 'Grænn', value: '#99ff99' },
    { label: 'Gulur', value: '#ffff66' },
    { label: 'Rauður', value: '#ff3300' }
];