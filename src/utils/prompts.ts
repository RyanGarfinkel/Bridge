const lessonContent = `
    The following is a description of a unit for a college readiness training module.
    Each unit is composed of a set of lessons that focus on a specific sub area of the overal unit topic, and a set of questions that quiz student on the material.
    The lessons, questions, and answers to the questions, are all customized to meet the personality, interests, and learning style of the student. 
    Make sure that when you generate the lesson contents that it is clear it is being custom tailored to their preferences.
    The content, questions, and answers should be based on the student's personality and their interests so as to be engaging and fun.
    Generate a set of lessons from the following unit description. 
    Each lesson should be approximately 800 to 1000 words of content on the lesson focus, and 4 multiple choice lessons on the content. 
    The questions should be multiple choice, with one correct answer and three incorrect answers. 
    The questions should be relevant to the content of the lesson, and should be designed to test the students understanding of the material. 
`

const academicLife = `
    Unit Name: Academic Life in College:
    Lessons:
        1. Introduction to College Academics - Familiarize students with the structure of college terms, grading systems, and graduation requirements at their university.
        2. Academic Success Mindset - Foster a growth mindset and encourage students to take ownership of their academic journey (The importance of persistence and learning from mistakes, Developing self-confidence and motivation, Goal-setting for both short-term and long-term academic success)
        3. Time Management Basics - Introduce students to the importance of time management and teach basic strategies for effective scheduling (How to create and maintain a balanced schedule using tools, Breaking down long-term projects into manageable tasks, Time-blocking and prioritizing urgent vs. important tasks) 
        4. Academic Writing and Research - Provide students with the tools they need to write strong academic papers and conduct research (Structuring essays: thesis statements, arguments, and conclusions, conducting research using academic sources, university library system)
        5. Academic integrity and plagiarism - educate students about academic integrity, the consequences of plagiarism, and the tools and techniques for ensuring that their work remains ethical and original.
`;

const mentalHealth = `
    Unit Name: Mental health
    Lessons:
        1. Introduction to Mental Health in College - Help students understand the importance of mental health and how it impacts their college experience (Common mental health challenges students face, The stigma surrounding mental health and how to reduce it, The impact of mental health on academics, relationships, and overall well-being)
        2. Recognizing Mental Health Struggles - Teach students how to identify signs of mental health challenges and recognize when they or others may need help (Early signs of stress, anxiety, and depression in students, Understanding emotional and physical symptoms, How to differentiate between normal stress and more serious mental health issues)
        3. Building Emotional Resilience - Equip students with strategies to build emotional resilience and cope with setbacks. (Techniques for managing stress and anxiety, How to deal with academic setbacks and personal challenges, Developing a positive self-talk and growth mindset)
        4. University Resources for Mental Health Support - Educate students on the mental health services available at their university and how to access them (Overview of counseling services, mental health hotlines, and support groups, The role of academic advisors, faculty, and student peers in supporting mental well-being, Confidentiality and privacy in accessing mental health services)
        5. Creating a Personalized Mental Health Plan - Encourage students to develop their own mental health plan, tailored to their needs and experiences (How to set mental health goals, Identifying personal triggers and coping strategies, Building a toolkit for mental health management, How to regularly assess and update your mental health plan)
`;

const healthyRelationships = `
    Unit Name: Healthy relationships
    Lessons:
        1. Introduction to Relationships in College - Understand the different types of relationships students will encounter and why they matter (Types of relationships, How relationships impact emotional well-being, academic success, and mental health, Navigating the new social environment of college)
        2. What Makes a Relationship Healthy? - Identify key traits of healthy relationships (Respect, trust, support, honesty, communication, and fairness, Balancing independence and closeness, Mutual growth and positive encouragement)
        3. Recognizing Unhealthy and Toxic Relationships - Help students spot warning signs of unhealthy dynamics (Red flags: manipulation, controlling behavior, dishonesty, jealousy, disrespect, Understanding emotional, verbal, and physical abuse, When and how to seek help or exit unhealthy relationships)
        4. Effective Communication Skills - Teach students how to express themselves clearly and listen actively (Active listening techniques, "I" statements vs. blame statements, Managing conflict with respect and openness)
        5. Setting and Respecting Boundaries - Empower students to define and maintain healthy personal boundaries (What are personal boundaries and why are they important, How to say "no" without guilt, Adjusting boundaries as relationships evolve)
`;

const drinkingAndSubstanceAbuse = `
    Unit Name: Drinking and substance use
    Lessons:
        1. Introduction to Alcohol and Substances in College Life - Set the context for why substance use is a relevant topic for college students (Common substances on college campuses, Social pressures and myths around drinking and drug use, Impact on academics, mental health, and physical safety)
        2. The Science of Alcohol and Drugs - Help students understand how substances affect the body and brain (How alcohol and drugs impact cognitive function, memory, decision-making, The effects of binge drinking vs. moderate drinking, Short-term and long-term health risks)
        3. Recognizing Problematic Use - Teach students how to recognize signs of unhealthy patterns (Warning signs of alcohol or substance misuse, Understanding what constitutes a substance use disorder, How to check in with yourself and seek help early)
        4. Safer Drinking and Substance Use Practices - Equip students with harm-reduction strategies if they choose to partake (Setting personal limits and sticking to them, Strategies for pacing, hydration, and eating before drinking, Avoiding mixing substances)
`;

const financialLiteracy = `
    Unit Name: Financial literacy
    Lessons:
        1. Introduction to Financial Literacy - Define what financial literacy is and why it's crucial for college students (The basics: earning, saving, spending, borrowing, investing, Why financial decisions in college have long-term impacts)
        2. Understanding Your Financial Aid - Demystify the world of student loans, grants, and scholarships (Types of financial aid: grants, scholarships, work-study, loans, Keeping track of aid obligations, Planning for repayment early)
        3. Smart Spending in College - Help students make mindful daily spending choices (Meal plans, groceries, and eating out, Student discounts and free resources, Avoiding impulse spending traps)
        4. Budgeting Basics - Teach students how to create and stick to a personal budget (Income vs. expenses: tracking your money flow, Essential vs. discretionary spending, Budgeting methods)
        5.Planning for Your Financial Future - Encourage students to think ahead beyond college (Setting financial goals, Seeking financial advice when needed, Building a positive, sustainable money mindset)
`;

const prompts = [lessonContent, academicLife, mentalHealth, healthyRelationships, drinkingAndSubstanceAbuse, financialLiteracy];

export default prompts;