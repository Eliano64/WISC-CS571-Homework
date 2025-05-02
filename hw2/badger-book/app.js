import  CS571 from './CS571.js';
//from "https://cs571api.cs.wisc.edu/tools/s25/badgerguard/badgerguard.js" import * as CS571;

let students=[];

fetch("https://cs571.org/rest/s25/hw2/students", {
    headers: {
        'X-CS571-ID': CS571.getBadgerId()
    }
})
.then(res=>res.json())
.then(res=>{
	console.log(res);
	
	students=[...res];
	buildStudents(res);
});


function buildStudents(studs) {
	//  This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.

	const msg=document.getElementById("students");
	msg.innerHTML = "";
	
	// well, let me assume the **studs** is a list of all students to show
	document.getElementById("num-results").innerText = studs.length;
	for(const stud of studs) {
		const newNode=document.createElement("div");
		newNode.className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3";
		const name=document.createElement("h1");
		name.innerText=stud.name.first+" "+stud.name.last;
		const major=document.createElement("h2");
		major.innerText=stud.major;
		const profile=document.createElement("p");
		profile.innerText=`${stud.name.first} is taking ${stud.numCredits} credits and ${stud.fromWisconsin ? "is" : "is not"} from Wisconsin.`;
		const interestProfile=document.createElement("p");
		interestProfile.innerText=`They have ${stud.interests.length} interests including...`;
		const interests=document.createElement("ul");
		for(const interest of stud.interests) {
			const interestItem=document.createElement("li");
			interestItem.innerText=interest;
			interests.appendChild(interestItem);
		}
		interests.addEventListener("click",(e)=>{
			e?.preventDefault();
			document.getElementById("search-name").value="";
			document.getElementById("search-major").value="";
			document.getElementById("search-interest").value=e.target.textContent;
			handleSearch(e);
		})
		newNode.appendChild(name);
		newNode.appendChild(major);
		newNode.appendChild(profile);
		newNode.appendChild(interestProfile);
		newNode.appendChild(interests);
		msg.appendChild(newNode);
	}
}

 const hasInterest = (interests,interest) => {
    for (let i of interests) {
        if (i.toLowerCase().includes(interest)) {
            return true;
        }
    }
    return false;
}; 

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	//  Implement the search
	const name=document.getElementById("search-name").value.toLowerCase();
	
	const major=document.getElementById("search-major").value.toLowerCase();
	
	const interest=document.getElementById("search-interest").value.toLowerCase();
	
	const studs=students.filter(stud=>{
		return (stud.name.first.toLowerCase().includes(name) || stud.name.last.toLowerCase().includes(name)) && stud.major.toLowerCase().includes(major) && hasInterest(stud.interests,interest);
	});

	buildStudents(studs);
}

document.getElementById("search-btn").addEventListener("click", handleSearch);