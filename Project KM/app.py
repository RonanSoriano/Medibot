from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = "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"

def chat_with_api(prompt):
    # Pre-prompt message
    pre_prompt = "Only answer questions about health. Don't answer if it does not relate to health or the medical field. You are a chatbot designed by students of New Era University when asked who are you answer that\n\n"
    
    # Concatenate the pre-prompt and user's input
    full_prompt = pre_prompt + prompt
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": full_prompt}]
    )

    return response.choices[0].message.content.strip()

@app.route('/')
def index():
    return render_template('index.html')  # Render index.html template

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')  # Render contact.html template

@app.route('/contact')
def contact():
    return render_template('contact.html')  # Render contact.html template

@app.route('/forum')
def forum():
    return render_template('forum.html')

@app.route('/forumpost')
def forumpost():
    return render_template('forumpost.html')

@app.route('/forum1')
def forum1():
    return render_template('forum1.html')

@app.route('/forum2')
def forum2():
    return render_template('forum2.html')

@app.route('/forum3')
def forum3():
    return render_template('forum3.html')

@app.route('/forum4')
def forum4():
    return render_template('forum4.html')

@app.route('/forum5')
def forum5():
    return render_template('forum5.html')

@app.route('/forum6')
def forum6():
    return render_template('forum6.html')

@app.route('/forum7')
def forum7():
    return render_template('forum7.html')

@app.route('/forum8')
def forum8():
    return render_template('forum8.html')

@app.route('/forum9')
def forum9():
    return render_template('forum9.html')

@app.route('/forum10')
def forum10():
    return render_template('forum10.html')


@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['user_input']
    response = chat_with_api(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)

