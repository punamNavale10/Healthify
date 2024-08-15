document.addEventListener('DOMContentLoaded', function() {
    // Initialize Chosen for symptom selection
    $(".chosen-select").chosen({
        no_results_text: "Oops, nothing found!"
    });

    document.getElementById('symptom-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const symptoms = $(".chosen-select").val().join(',');  // Get selected symptoms

        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `symptoms=${encodeURIComponent(symptoms)}`
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').classList.remove('hidden');

            document.getElementById('disease').innerText = `Predicted Disease: ${data.disease}`;
            document.getElementById('description').innerText = data.description.join(' ');

            const precautionList = document.getElementById('precautions');
            precautionList.innerHTML = '';
            data.precautions.forEach(pre => {
                const li = document.createElement('li');
                li.innerText = pre;
                precautionList.appendChild(li);
            });

            const medicationList = document.getElementById('medications');
            medicationList.innerHTML = '';
            data.medications.forEach(med => {
                const li = document.createElement('li');
                li.innerText = med;
                medicationList.appendChild(li);
            });

            const workoutList = document.getElementById('workout');
            workoutList.innerHTML = '';
            data.workout.forEach(wrk => {
                const li = document.createElement('li');
                li.innerText = wrk;
                workoutList.appendChild(li);
            });

            const dietList = document.getElementById('diets');
            dietList.innerHTML = '';
            data.diets.forEach(die => {
                const li = document.createElement('li');
                li.innerText = die;
                dietList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
    });
});
