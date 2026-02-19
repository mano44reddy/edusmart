// Check if user is logged in
fetch('/api/user')
.then(r=>{
    if(r.status===401) window.location.href = '/student-login.html';
    return r.json();
})
.then(user=>{
    const profileDiv = document.getElementById('profileDetails');
    profileDiv.innerHTML = `
        <label>Name</label><input type="text" id="nameField" value="${user.name}">
        <label>Email</label><input type="text" id="emailField" value="${user.email}" disabled>
    `;
    if(user.type==='tutor'){
        profileDiv.innerHTML += `
            <label>Headline</label><input type="text" id="headline">
            <label>Qualifications</label><input type="text" id="qualifications">
            <label>Skills</label><input type="text" id="skills">
            <label>Experience</label><input type="text" id="experience">
        `;
        // Load tutor courses
        fetch('/api/courses').then(r=>r.json()).then(courses=>{
            const list = document.getElementById('coursesList');
            courses.forEach(c=>{
                const card=document.createElement('div');
                card.className='card';
                card.innerHTML=`<h3>${c.name}</h3><p>${c.description}</p>`;
                list.appendChild(card);
            });
        });
    } else {
        // Load courses & enrolled courses
        fetch('/api/courses').then(r=>r.json()).then(courses=>{
            const list = document.getElementById('coursesList');
            courses.forEach(c=>{
                const card=document.createElement('div');
                card.className='card';
                card.innerHTML=`<h3>${c.name}</h3><p>${c.description}</p><button class="btn enrollBtn" data-id="${c.id}">Enroll</button>`;
                list.appendChild(card);
            });
            document.querySelectorAll('.enrollBtn').forEach(btn=>{
                btn.addEventListener('click',()=>{
                    fetch('/api/students/enroll',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({courseId:parseInt(btn.dataset.id)})})
                    .then(r=>r.json()).then(data=>{ if(data.success) alert('Enrolled Successfully!'); });
                });
            });
        });
        // Load enrolled courses
        fetch('/api/students').then(r=>r.json()).then(students=>{
            const enrolledDiv = document.getElementById('enrolledList');
            const student = students.find(s=>s.email===user.email);
            if(student){
                student.courses.forEach(cid=>{
                    fetch('/api/courses').then(r=>r.json()).then(courses=>{
                        const c = courses.find(course=>course.id===cid);
                        if(c){
                            const card=document.createElement('div'); card.className='card';
                            card.innerHTML=`<h3>${c.name}</h3><p>${c.description}</p>`;
                            enrolledDiv.appendChild(card);
                        }
                    });
                });
            }
        });
    }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click',()=>{
    fetch('/logout').then(()=>window.location.href='/student-login.html');
});
