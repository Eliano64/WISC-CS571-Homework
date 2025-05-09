import { Button, Container, Form, Row, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import Student from "./Student";


const Classroom = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            }
        })
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                console.log(data);
            })
    }, []);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");

    const handleSearch = (student) => {
        return (student.name.first + " " + student.name.last).toLowerCase().includes(searchName.toLowerCase().trim()) && student.major.toLowerCase().includes(searchMajor.toLowerCase().trim()) && student.interests.some(interest => interest.toLowerCase().includes(searchInterest.toLowerCase().trim()));
    }
    
    const clickButton = () => {
        setSearchName("");
        setSearchMajor("");
        setSearchInterest("");
    }

    let results = students.filter(handleSearch);
    let pages = [];
    let totalPage = 1;
    for (let i = 0; i < results.length; i += 24) {
        pages.push(totalPage++);
    }

    const [curPage, setCurPage] = useState(1);
    useEffect(() => {
        setCurPage(1);
    }, [searchName, searchMajor, searchInterest]);

    // useEffect(() => {
    //      console.log("students changed");
    //  }, [students]);
    //  useEffect(() => {
    //     console.log("pages changed");
    // }, [pages]);
    //  useEffect(() => {
    //     console.log("results changed");
    // }, [results]);
    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName" >Name</Form.Label>
            <Form.Control id="searchName" onChange={(e) => setSearchName(e.target.value)} value={searchName} />
            <Form.Label htmlFor="searchMajor" >Major</Form.Label>
            <Form.Control id="searchMajor" onChange={(e) => setSearchMajor(e.target.value)} value={searchMajor} />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" onChange={(e) => setSearchInterest(e.target.value)} value={searchInterest} />
            <br />
            <Button variant="neutral" onClick={clickButton}>Reset Search</Button>
        </Form>
        <hr />
        <p>There are {results.length} student(s) matching your search</p>
        <Container fluid>
            <Row>
                {results.slice((curPage - 1) * 24, curPage * 24).map(student => <Student {...student} key={student.id} />)}

            </Row>
        </Container>
        <Pagination>
            <Pagination.First disabled={pages.length <= 0} onClick={()=>{setCurPage(1)}}>First</Pagination.First>
            <Pagination.Prev disabled={curPage === 1 || pages.length <= 0} onClick={()=>{setCurPage(curPage=>--curPage)}} >Previous</Pagination.Prev>
            {pages.map(page => <Pagination.Item key={page} active={page === curPage} onClick={() => { setCurPage(page) }}>{page}</Pagination.Item>)}
            <Pagination.Next disabled={curPage === pages[pages.length - 1] || pages.length <= 0} onClick={()=>{setCurPage(curPage=>++curPage)}}>Next</Pagination.Next>
            <Pagination.Last disabled={pages.length <= 0} onClick={()=>{setCurPage(pages[pages.length - 1])}}>Last</Pagination.Last>
        </Pagination>
    </div>

}

export default Classroom;