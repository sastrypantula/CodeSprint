const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/problem');
const User = require('../models/user');

async function seedProblem() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        console.log('✅ MongoDB connected');

        // Find admin user
        const admin = await User.findOne({ emailId: 'sastry@admin.com' });
        if (!admin) {
            console.log('❌ Admin user not found! Please run seedAdmin.js first.');
            await mongoose.connection.close();
            return;
        }
        console.log('✅ Admin user found:', admin.firstName);

        // Check if problem already exists
        const existingProblem = await Problem.findOne({ title: 'Addition of Two Numbers' });
        if (existingProblem) {
            console.log('⚠️ Problem already exists!');
            await mongoose.connection.close();
            return;
        }

        // Create problem
        const problemData = {
            title: "Addition of Two Numbers",
            description: "Write a program that takes two integers as input and returns their sum.",
            difficulty: "easy",
            tags: "array",
            visibleTestCases: [
                {
                    input: "2 3",
                    output: "5",
                    explanation: "2 + 3 equals 5"
                },
                {
                    input: "-1 5",
                    output: "4",
                    explanation: "-1 + 5 equals 4"
                }
            ],
            hiddenTestCases: [
                {
                    input: "10 20",
                    output: "30"
                },
                {
                    input: "100 250",
                    output: "350"
                }
            ],
            startCode: [
                {
                    language: "C++",
                    initialCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read input here\n    cout << a + b;\n    return 0;\n}"
                },
                {
                    language: "Java",
                    initialCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Read input here\n    }\n}"
                },
                {
                    language: "JavaScript",
                    initialCode: "const readline = require('readline');\n\n// Complete input handling here"
                }
            ],
            referenceSolution: [
                {
                    language: "C++",
                    completeCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b;\n    return 0;\n}"
                },
                {
                    language: "Java",
                    completeCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}"
                },
                {
                    language: "JavaScript",
                    completeCode: "const input = require('fs').readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(a + b);"
                }
            ],
            problemCreator: admin._id
        };

        const problem = new Problem(problemData);
        await problem.save();

        console.log('✅ Problem created successfully!');
        console.log('📝 Title:', problem.title);
        console.log('🎯 Difficulty:', problem.difficulty);
        console.log('🏷️ Tags:', problem.tags);
        console.log('👤 Creator: Sastry (Admin)');

        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

seedProblem();
