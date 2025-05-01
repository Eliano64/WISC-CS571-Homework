function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    const jobs = document.getElementsByName("job");
    for (const job of jobs) {
        if (job.checked) {
            alert(`Thank you for applying to be a ${job.value} !`);
        }
    }
}