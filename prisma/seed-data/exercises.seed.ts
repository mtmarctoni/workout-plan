import { Prisma } from '@prisma/client';

export const exercises: Prisma.ExerciseCreateInput[]= [
    {
        id: 'ex1',
        name: 'Medicine Ball Explosive Push-ups',
        description: 'Develop explosive upper body power for throwing and blocking movements.',
        category: 'UPPER_POWER',
        type: 'POWER',
        level: 'INTERMEDIATE',
        videoUrl: '', // Medicine Ball Push-up Tutorial by Athlean-X
        instructions: [
            'Start in push-up position with hands on medicine ball',
            'Lower chest to ball with control',
            'Explosively push up, releasing hands from ball',
            'Land with hands back on ball, immediately lower for next rep'
        ],
        equipment: ['Medicine Ball', 'Mat'],
        muscleGroups: ['Chest', 'Shoulders', 'Triceps', 'Core'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Reduce range of motion by 20%, focus on controlled eccentric',
        defaultSets: 4,
        defaultReps: '8-10',
        defaultRestSeconds: 90,
    },
    {
        id: 'ex2',
        name: 'Plyometric Pull-ups',
        description: 'Build explosive pulling power for defensive movements and ball interception.',
        category: 'UPPER_POWER',
        type: 'POWER',
        level: 'ADVANCED',
        videoUrl: 'https://www.youtube.com/watch?v=2qCz9y0-heI', // Plyometric Pull-up Tutorial by Calisthenicmovement
        instructions: [
            'Hang from pull-up bar with overhand grip',
            'Pull up explosively, aiming to get chest to bar',
            'Release grip briefly at top if possible',
            'Re-grip and control descent slowly'
        ],
        equipment: ['Pull-up Bar'],
        muscleGroups: ['Lats', 'Rhomboids', 'Biceps', 'Core'],
        hasHyperlaxityMod: false,
        defaultSets: 4,
        defaultReps: '6-8',
        defaultRestSeconds: 120,
    },    
    {
        id: 'ex3',
        name: 'Bulgarian Split Squat',
        description: 'Single-leg squat to build lower body strength and stability.',
        category: 'LOWER_STRENGTH',
        type: 'STRENGTH',
        level: 'INTERMEDIATE',
        videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE', // Bulgarian Split Squat Tutorial by Jeremy Ethier
        instructions: [
        'Stand with one foot behind on a bench or step, front foot flat on the ground',
        'Lower hips until front thigh is parallel to floor',
        'Push through front heel to return to start',
        'Repeat for all reps, then switch legs'
        ],
        equipment: ['Bench', 'Dumbbells'],
        muscleGroups: ['Quads', 'Glutes', 'Hamstrings', 'Core'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Reduce depth and keep movement slow and controlled',
        defaultSets: 3,
        defaultReps: '8-10',
        defaultRestSeconds: 90,
    },
    {
        id: 'ex4',
        name: 'Depth Jumps',
        description: 'Plyometric exercise to improve explosive vertical leap.',
        category: 'LOWER_POWER',
        type: 'POWER',
        level: 'INTERMEDIATE',
        videoUrl: 'https://www.youtube.com/watch?v=DxzbXy0lC6Y', // Depth Jumps Tutorial by The Jump Manual
        instructions: [
        'Stand on a sturdy box or step',
        'Step off and land softly on both feet',
        'Immediately jump as high as possible after landing',
        'Reset and repeat'
        ],
        equipment: ['Box'],
        muscleGroups: ['Quads', 'Glutes', 'Calves', 'Core'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Use lower box height and focus on soft landings',
        defaultSets: 4,
        defaultReps: '5',
        defaultRestSeconds: 120,
    },
    {
        id: 'ex5',
        name: 'Single-leg Romanian Deadlift',
        description: 'Develops hamstring and glute strength with balance and stability.',
        category: 'LOWER_STRENGTH',
        type: 'STRENGTH',
        level: 'INTERMEDIATE',
        videoUrl: 'https://www.youtube.com/watch?v=MsE_T9nAsSE', // Single-leg RDL Tutorial by Jeff Nippard
        instructions: [
        'Stand on one leg with slight knee bend',
        'Hold weight in opposite hand',
        'Hinge at hips, lowering weight toward floor while extending free leg back',
        'Return to start and repeat'
        ],
        equipment: ['Dumbbell'],
        muscleGroups: ['Hamstrings', 'Glutes', 'Core'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Limit range of motion and maintain slow tempo',
        defaultSets: 3,
        defaultReps: '10/side',
        defaultRestSeconds: 90,
    },
    {
        id: 'ex6',
        name: 'Resistance Band Push-Press',
        description: 'Builds explosive shoulder and triceps strength for throwing.',
        category: 'UPPER_POWER',
        type: 'POWER',
        level: 'INTERMEDIATE',
        videoUrl: 'https://www.youtube.com/watch?v=OTmpdnJkneI', // Resistance Band Push Press Tutorial by Jeremy Ethier
        instructions: [
        'Stand on band, hold handles at shoulders',
        'Dip knees slightly, then drive up and press arms overhead explosively',
        'Lower under control and repeat'
        ],
        equipment: ['Resistance Band'],
        muscleGroups: ['Shoulders', 'Triceps', 'Core'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Limit overhead range and avoid locking elbows',
        defaultSets: 4,
        defaultReps: '8',
        defaultRestSeconds: 90,
    },
    {
        id: 'ex7',
        name: 'Pull-ups with Resistance Band',
        description: 'Assisted pull-ups to build upper body pulling strength.',
        category: 'UPPER_STRENGTH',
        type: 'STRENGTH',
        level: 'INTERMEDIATE',
        videoUrl: 'https://www.youtube.com/watch?v=__TzXC-Hc_4', // Band-Assisted Pull-up Tutorial by Calisthenicmovement
        instructions: [
        'Loop band over pull-up bar and place foot in band',
        'Grip bar with overhand grip, arms fully extended',
        'Pull chin above bar, then lower under control'
        ],
        equipment: ['Pull-up Bar', 'Resistance Band'],
        muscleGroups: ['Lats', 'Biceps', 'Shoulders', 'Core'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Do not fully extend elbows at bottom, control descent',
        defaultSets: 3,
        defaultReps: 'max',
        defaultRestSeconds: 120,
    },
    {
        id: 'ex8',
        name: 'Shuttle Runs',
        description: 'High-intensity interval running to develop sport-specific endurance.',
        category: 'CONDITIONING',
        type: 'HIIT',
        level: 'ALL',
        videoUrl: 'https://www.youtube.com/watch?v=9pb6JX2ulDU', // Shuttle Run Tutorial by The Body Coach TV
        instructions: [
        'Set two markers 15 meters apart',
        'Sprint from one marker to the other and back as fast as possible',
        'Rest and repeat as programmed'
        ],
        equipment: ['Cones'],
        muscleGroups: ['Legs', 'Core'],
        hasHyperlaxityMod: false,
        defaultSets: 10,
        defaultReps: '30s sprint / 90s rest',
        defaultRestSeconds: 90,
    },
    {
        id: 'ex9',
        name: 'Lateral Bounds',
        description: 'Plyometric movement to improve lateral power and agility.',
        category: 'AGILITY',
        type: 'POWER',
        level: 'INTERMEDIATE',
        videoUrl: 'https://www.youtube.com/watch?v=soqQy4dzEts', // Lateral Bounds Tutorial by The Jump Manual
        instructions: [
        'Stand on one leg, bend knee slightly',
        'Jump laterally to opposite side, landing softly on other leg',
        'Repeat side to side for all reps'
        ],
        equipment: [],
        muscleGroups: ['Glutes', 'Quads', 'Calves', 'Core'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Use smaller jumps and focus on balance and control',
        defaultSets: 4,
        defaultReps: '10/side',
        defaultRestSeconds: 90,
    },
    {
        id: 'ex10',
        name: '90/90 Hip Mobility',
        description: 'Dynamic stretch to improve hip mobility and joint health.',
        category: 'MOBILITY',
        type: 'MOBILITY',
        level: 'ALL',
        videoUrl: 'https://www.youtube.com/watch?v=F1XdXdCjERk', // 90/90 Hip Mobility by Tom Merrick
        instructions: [
        'Sit with one leg bent in front at 90°, other leg bent behind at 90°',
        'Rotate knees side to side, keeping chest tall',
        'Hold each side briefly, repeat for reps'
        ],
        equipment: [],
        muscleGroups: ['Hips', 'Glutes'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Limit range and avoid forcing stretch',
        defaultSets: 2,
        defaultReps: '10/side',
        defaultRestSeconds: 30,
    },
    {
        id: 'ex11',
        name: 'Core Rotational Plank',
        description: 'Core exercise to build rotational strength for throwing and stability.',
        category: 'CORE',
        type: 'STRENGTH',
        level: 'INTERMEDIATE',
        videoUrl: 'https://www.youtube.com/watch?v=RXlHKL_NEN8', // Rotating Side Plank Tutorial by Fitness Blender
        instructions: [
        'Start in forearm plank',
        'Rotate torso and reach one arm up to ceiling',
        'Return to plank, repeat on other side'
        ],
        equipment: ['Mat'],
        muscleGroups: ['Core', 'Obliques', 'Shoulders'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Limit rotation range and keep hips stable',
        defaultSets: 3,
        defaultReps: '10/side',
        defaultRestSeconds: 60,
    },
    {
        id: 'ex12',
        name: 'Yoga Flow for Shoulders',
        description: 'Mobility routine to improve shoulder health and stability.',
        category: 'MOBILITY',
        type: 'MOBILITY',
        level: 'ALL',
        videoUrl: 'https://www.youtube.com/watch?v=4pKly2JojMw', // Yoga for Shoulders by Yoga with Adriene
        instructions: [
        'Move through a series of yoga poses: Downward Dog, Thread-the-Needle, Child’s Pose',
        'Hold each pose for 20-30 seconds',
        'Repeat sequence as programmed'
        ],
        equipment: ['Mat'],
        muscleGroups: ['Shoulders', 'Back', 'Core'],
        hasHyperlaxityMod: true,
        hyperlaxityMod: 'Avoid end-range stretches, keep movements gentle',
        defaultSets: 1,
        defaultReps: '1 flow',
        defaultRestSeconds: 0,
    }      
];