/** Original educational summaries for the concern landing pages. */
export type ConcernDetail = {
  intro: string;
  signs: string[];
  experiences: [string, string][];
  goals: string[];
  seek: string;
};
export const concernDetails: Record<string, ConcernDetail> = {
  anxiety: {
    intro: "Anxiety is a response to uncertainty or a sense of danger. It can be useful for a moment, but exhausting when worry keeps returning or begins to shape your everyday choices. You can ask for support without having a diagnosis.",
    signs: ["Worry that keeps returning", "Feeling restless or on edge", "Difficulty settling into sleep", "Avoiding situations you used to manage", "Trouble focusing on everyday tasks", "Tension or a racing heartbeat"],
    experiences: [["Everyday worry", "Concerns about work, family or the future that feel difficult to set aside."], ["Social situations", "Fear of judgement that makes meeting people or speaking up uncomfortable."], ["Health worries", "Repeated concern about illness and a strong urge to seek reassurance."], ["Performance pressure", "Anxiety around exams, interviews, presentations or being evaluated."], ["Panic experiences", "Sudden episodes of intense fear that can feel frightening in the body."], ["Stress and uncertainty", "Worry during demanding periods, changes or life away from home."]],
    goals: ["Notice the situations and thought patterns that feed worry", "Practise ways to respond to anxious thoughts", "Build skills for settling physical tension", "Approach avoided situations at a manageable pace"],
    seek: "Consider talking to someone when worry regularly interrupts your sleep, work or relationships, or makes your world feel smaller. New or severe physical symptoms also deserve medical attention rather than being assumed to be anxiety.",
  },
  depression: {
    intro: "Depression can affect how you feel, think and move through the day. It may involve sadness, numbness or a loss of interest rather than feeling upset all the time. These experiences deserve care, even when they are hard to explain.",
    signs: ["Low mood or emotional numbness", "Less interest in familiar activities", "Changes in sleep or appetite", "Low energy or motivation", "Difficulty concentrating", "Withdrawing from other people"],
    experiences: [["Feeling disconnected", "Things that once mattered may feel distant or difficult to enjoy."], ["Harsh self-criticism", "Guilt or a sense of not being good enough can become persistent."], ["Daily routines", "Getting started with meals, work or personal care may take more effort."], ["Life changes", "Loss, illness, isolation or major transitions may be part of the picture."]],
    goals: ["Make room to describe what life has been feeling like", "Understand patterns in mood and daily routines", "Find small, realistic ways to reconnect with activities", "Discuss additional medical support when appropriate"],
    seek: "Reach out when low mood or loss of interest persists, daily tasks become difficult, or you feel increasingly isolated. You do not need to wait until things feel unbearable to have a first conversation.",
  },
  relationships: {
    intro: "Relationships can bring closeness and also leave us feeling misunderstood. Counselling offers space to explore recurring difficulties, whether you come on your own or with a partner. The aim is to understand your needs and choices, without deciding for you.",
    signs: ["Repeating the same arguments", "Feeling unheard or distant", "Difficulty expressing needs", "Uncertainty about trust", "Struggling with boundaries", "Facing a difficult decision together"],
    experiences: [["Communication", "Conversations turn into arguments or end before either person feels heard."], ["Trust and repair", "A rupture has changed how safe or close the relationship feels."], ["Life transitions", "Marriage, parenting, migration or caring responsibilities bring new pressures."], ["Individual choices", "You want to understand your boundaries, patterns or next steps."]],
    goals: ["Recognise recurring patterns between you", "Practise clearer ways to express needs and listen", "Explore boundaries and expectations", "Make thoughtful decisions about what comes next"],
    seek: "Support can help when conflict keeps repeating, distance grows, or an important decision feels hard to discuss. If there is fear, coercion or violence, seek individual safety support; joint sessions may not be appropriate.",
  },
  "work-stress": {
    intro: "Pressure at work can spill into sleep, relationships and time meant for rest. Burnout describes exhaustion and distance from work after ongoing workplace stress. Counselling can help you examine both your coping patterns and the demands around you.",
    signs: ["Feeling drained before the day begins", "Difficulty switching off after work", "Irritability or detachment", "Reduced concentration", "Rest no longer feels restorative", "Work crowding out personal life"],
    experiences: [["Unmanageable demands", "The workload or expectations feel difficult to sustain."], ["Boundaries", "Saying no, taking breaks or ending the workday feels uncomfortable."], ["Workplace relationships", "Conflict or a lack of support adds to the pressure."], ["Career uncertainty", "You feel stuck or unsure what a healthier working life could look like."]],
    goals: ["Identify what is draining you and what is within your control", "Explore workable boundaries and recovery time", "Understand expectations you place on yourself", "Think through changes and conversations at work"],
    seek: "Consider support when stress continues outside working hours, affects your health or relationships, or leaves you feeling unable to recover. Persistent exhaustion may also need a medical assessment.",
  },
  grief: {
    intro: "Grief is a response to losing someone or something important. It can move between sadness, anger, numbness and moments of ordinary life. There is no single timetable, and counselling does not ask you to leave the loss behind.",
    signs: ["Waves of sadness or longing", "Numbness or disbelief", "Changes in sleep or appetite", "Guilt or unanswered questions", "Difficulty returning to routines", "Feeling alone in your loss"],
    experiences: [["Bereavement", "Living with the death of someone important to you."], ["Other losses", "Separation, health changes or a lost future can also bring grief."], ["Family expectations", "Your way of grieving may differ from the people around you."], ["Anniversaries and reminders", "Dates, places or ordinary moments can bring feelings back strongly."]],
    goals: ["Speak about the loss in your own way", "Make room for feelings without a fixed deadline", "Find support for everyday life", "Explore how to carry memories and connection forward"],
    seek: "You can seek support at any point, especially if grief feels isolating, daily life is difficult to manage, or you would value a space outside family and friends.",
  },
  trauma: {
    intro: "After a frightening or overwhelming experience, the effects may stay with you even when the event is over. You may notice changes in your sense of safety, sleep or relationships. Support should move at a pace you agree to; you do not have to recount everything at once.",
    signs: ["Unwanted memories or nightmares", "Feeling constantly alert", "Avoiding reminders", "Feeling detached or numb", "Difficulty trusting or relaxing", "Strong reactions to reminders"],
    experiences: [["Feeling safe again", "Everyday situations may keep your body on alert."], ["Memories and reminders", "Past experiences can feel close when something brings them back."], ["Connection", "Trust, closeness or being understood may feel more complicated."], ["Choice and control", "Having a say in the pace of support matters."]],
    goals: ["Agree boundaries and a pace that feels manageable", "Develop grounding and coping skills", "Understand responses to reminders", "Explore suitable trauma-focused care with your practitioner"],
    seek: "Consider support when reminders, sleep problems or a sense of danger interfere with daily life. You can begin by talking about what you need now, without describing the experience in detail.",
  },
  parenting: {
    intro: "Parenting can involve love, uncertainty and pressure at the same time. Counselling is a place to reflect on your child's needs alongside your own, and to explore approaches that fit your family rather than an ideal of perfect parenting.",
    signs: ["Frequent conflict at home", "Feeling overwhelmed or depleted", "Uncertainty about boundaries", "Different approaches between caregivers", "Difficulty connecting with your child", "Guilt about your responses"],
    experiences: [["Everyday boundaries", "Finding consistency without every conversation becoming a struggle."], ["Growing independence", "Adjusting as a child moves through school or adolescence."], ["Caregiver differences", "Working through different expectations across adults or generations."], ["Your wellbeing", "Making space for your needs while caring for someone else."]],
    goals: ["Understand patterns in difficult moments", "Explore realistic expectations and boundaries", "Practise communication and repair", "Build support for your own wellbeing"],
    seek: "A conversation may help when family stress keeps repeating, you feel unsupported, or your usual approaches no longer seem to work. You do not need a crisis to ask for guidance.",
  },
  anger: {
    intro: "Anger is a normal emotion. Difficulties arise when its intensity, expression or aftermath harms you or your relationships. Counselling can help you understand what happens before anger builds and find different ways to respond.",
    signs: ["Reactions that feel bigger than intended", "Frequent irritability", "Arguments you later regret", "Difficulty calming down", "Holding anger in until it builds", "Strain in close relationships"],
    experiences: [["Build-up", "Stress and unmet needs can accumulate before you notice them."], ["Conflict", "It becomes difficult to express frustration without an argument."], ["Turning inward", "Anger may show up as self-criticism or withdrawal."], ["Repair", "You want to take responsibility and change what happens next."]],
    goals: ["Notice early signals and recurring triggers", "Practise pausing before responding", "Express needs and boundaries more clearly", "Work on accountability and relationship repair"],
    seek: "Seek support when anger repeatedly damages relationships, affects work, or feels difficult to control. If you fear you may hurt someone, prioritise immediate safety and urgent local support.",
  },
  ocd: {
    intro: "OCD involves unwanted, distressing thoughts or urges and repeated actions or mental rituals used to reduce distress. It is more than liking things tidy. A practitioner can help you understand the pattern and discuss suitable evidence-based care.",
    signs: ["Intrusive thoughts that cause distress", "Repeated checking or washing", "Mental rituals or counting", "A strong need for reassurance", "Avoiding situations that trigger doubt", "Rituals taking up significant time"],
    experiences: [["Checking and doubt", "Feeling driven to check again despite having already checked."], ["Contamination fears", "Worries about contamination may lead to repeated cleaning or avoidance."], ["Unwanted thoughts", "Intrusive thoughts can feel upsetting and conflict with your values."], ["Mental rituals", "Repeating, reviewing or seeking certainty can happen silently."]],
    goals: ["Understand the cycle of obsessions and compulsions", "Discuss CBT with exposure and response prevention where appropriate", "Explore how reassurance and avoidance affect the cycle", "Plan care with a practitioner experienced in OCD"],
    seek: "Seek an assessment when unwanted thoughts and rituals take up time, cause distress or interfere with daily life. Ask about the practitioner's experience with OCD and exposure and response prevention.",
  },
  sleep: {
    intro: "Difficulty falling asleep, staying asleep or waking too early can affect the whole day. Sleep problems can have emotional, behavioural or physical causes. Counselling can explore the worry and habits around sleep alongside medical advice when needed.",
    signs: ["Taking a long time to fall asleep", "Waking repeatedly through the night", "Waking earlier than intended", "Worrying about not sleeping", "Feeling tired during the day", "Sleep affecting mood or concentration"],
    experiences: [["Bedtime worry", "The mind feels busiest when you want to settle down."], ["Broken sleep", "You wake during the night and struggle to return to sleep."], ["Changing routines", "Shift work, travel or life changes can disrupt sleep patterns."], ["Pressure to sleep", "Trying harder to sleep can become a source of frustration."]],
    goals: ["Understand your sleep routine and sources of worry", "Discuss approaches such as CBT for insomnia when suitable", "Explore sustainable changes to sleep habits", "Identify when a medical or sleep assessment is needed"],
    seek: "Consider support when sleep difficulties persist or affect your daytime functioning. Loud snoring, breathing pauses, marked daytime sleepiness or other physical symptoms should be discussed with a doctor.",
  },
};
