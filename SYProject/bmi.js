function calculateBMI() {
    const height = document.getElementById("height").value / 100; // Convert cm to meters
    const weight = document.getElementById("weight").value;

    if (height > 0 && weight > 0) {
        const bmi = (weight / (height * height)).toFixed(2);
        document.getElementById("result").innerText = Your ;
        document.getElementById("bmi").value = bmi; // Pass BMI value to the form
    } else {
        alert("Please enter valid height and weight!");
    }
}