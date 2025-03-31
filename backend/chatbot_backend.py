from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OpenAI API key is required")

openai.api_key = api_key

# Store your information
PIYUSH_INFO = {
    "resume": """
    Name: Piyush Kumar Arya
Email: piyush011098@gmail.com
LinkedIn: linkedin.com/in/piyush-79

Current Education: M.S. in Computer Science, University of Massachusetts Boston (Aug 2023 – May 2025)
Previous Education: B.Tech in Electrical Engineering, Delhi Technological University (2018 – 2022)

Work Experience:
- Graduate Teaching Fellow at UMass Boston: Teaching CS topics like algorithms, data structures, OS, DBMS, networks, and software engineering. Designed interactive sessions and mentored students.
- Engineer at Samsung Research Institute:
  • Robot Vacuum Cleaner: Improved path planning using RL/DL, increased accuracy from 88% to 93%.
  • Smart TV: Created AI solution to detect memory leaks using CV and RL, achieving 86% accuracy.
  • Odyssey Ark Gaming Monitor: Led software bug fixes for product launch.

Technical Projects:
- MediDonut: OCR and classification pipeline for medical prescription detection.
- Skills Boost AI: Fine-tuned LLMs (LLAMA, DialoGPT) for soft skills training chatbot.
- Hotel Booking App: Full-stack MERN-based booking system.
- Music Generator: LSTM-based generative model for composing new music (86% → 95% accuracy).
- Travelista: Camp-sharing platform using Node.js, MongoDB, Bootstrap.

Publication:
- Published "Music Generation using LSTM" in ATDE/IJEER, 2022 (Scopus indexed).

Skills:
- Languages: C++, Python, Java, JavaScript, SQL, HTML/CSS, TypeScript, Octave, Matlab
- Domains: Software Dev, OS, DBMS, DS/Algo, OOP, AI/ML, DL, RL, NLP, CV, Web Dev, System Design
- Tools: TensorFlow, PyTorch, Keras, OpenCV, Hugging Face, Git, MongoDB, React, Node.js, Express, Kubernetes, CUDA

Achievements:
- Won Samsung internal hackathon (screen share & video call for Flip Smart Board)
- Built social fridge app connecting donors with those in need
""",
    "behavioral_info": """
Piyush is a highly reliable, professional, and collaborative individual. He is a team player with a strong sense of ownership and responsibility. He is known for being a quick learner, excellent problem solver, and someone who thrives in fast-paced environments. He demonstrates a passion for innovation and brings a structured yet creative approach to projects.
""",
    "is_initialized": True
}

# System message template
SYSTEM_MESSAGE = """You are Piyush's personal AI assistant. Your role is to:
1. Only answer questions about Piyush based on the provided resume and behavioral information
2. If a question is not directly or indirectly related to Piyush, respond with: "I can only answer questions about Piyush. Please ask something related to him."
3. Maintain a friendly, conversational, and professional tone.
4. Only write small or medium sized paragraphs

Resume Information:
{resume}

Behavioral Information:
{behavioral_info}"""

@app.route("/initialize", methods=["POST"])
def initialize():
    try:
        data = request.json
        PIYUSH_INFO["resume"] = data.get("resume", "")
        PIYUSH_INFO["behavioral_info"] = data.get("behavioral_info", "")
        PIYUSH_INFO["is_initialized"] = True
        return jsonify({"message": "Information initialized successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/chat", methods=["POST"])
def chat():
    try:
        if not PIYUSH_INFO["is_initialized"]:
            return jsonify({"error": "Please initialize the chatbot with Piyush's information first"}), 400

        user_input = request.json.get("message", "")
        # Prepare the system message with current information
        current_system_message = SYSTEM_MESSAGE.format(
            resume=PIYUSH_INFO["resume"],
            behavioral_info=PIYUSH_INFO["behavioral_info"]
        )
        try:
            # Call OpenAI API
            response = openai.chat.completions.create(
                model="gpt-4o-2024-08-06",
                messages=[
                    {"role": "system", "content": current_system_message},
                    {"role": "user", "content": user_input}
                ],
                max_tokens=500,
                temperature=0.7
            )
            # Extract the response
            bot_response = response.choices[0].message.content
            return jsonify({"response": bot_response})
            
        except Exception as e:
            return jsonify({"error": "Error communicating with OpenAI API. Please try again later."}), 503
            
    except Exception as e:
        return jsonify({"error": "Server error. Please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
