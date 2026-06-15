export async function generateQuiz(courseTitle, chapterTitle) {
    const prompt = `Kamu adalah asisten pendidikan. Buatlah 5 soal pilihan ganda dalam Bahasa Indonesia tentang "${chapterTitle}" dalam mata kuliah "${courseTitle}".
  
  Format jawaban HARUS berupa JSON seperti ini (jangan tambahkan teks lain apapun):
  [
    {
      "soal": "pertanyaan di sini",
      "pilihan": ["pilihan A", "pilihan B", "pilihan C", "pilihan D"],
      "jawaban": 0,
      "penjelasan": "penjelasan jawaban di sini"
    }
  ]
  
  Catatan:
  - "jawaban" adalah index dari pilihan yang benar (0, 1, 2, atau 3)
  - Buat soal yang relevan dan edukatif
  - Tingkat kesulitan sedang`;
  
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });
  
    const data = await response.json();
    const text = data.content[0].text;
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  }