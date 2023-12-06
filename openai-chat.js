<script>
    function generateResponse() {
        const prompt = document.getElementById('prompt').value;

        $.ajax({
            url: 'https://api.openai.com/v1/chat/completions',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
            },
            data: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt }
                ]
            }),
            success: function (data) {
                const response = data.choices[0].message.content.trim();
                document.getElementById('response').innerHTML = response;
            },
            error: function (error) {
                console.error('Error fetching response:', error);
            }
        });
    }
</script>