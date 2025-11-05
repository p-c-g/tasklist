// Emoji suggestion based on task keywords
export function suggestEmoji(taskText: string): string {
  const text = taskText.toLowerCase();
  
  // Define emoji mappings based on keywords
  const emojiMap: { [key: string]: string } = {
    // Food & Cooking
    'eat': '🍽️',
    'cook': '👨‍🍳',
    'breakfast': '🥐',
    'lunch': '🥗',
    'dinner': '🍝',
    'food': '🍔',
    'pizza': '🍕',
    'coffee': '☕',
    'tea': '🍵',
    'water': '💧',
    'grocery': '🛒',
    'shop': '🛍️',
    
    // Work & Productivity
    'work': '💼',
    'meeting': '🤝',
    'email': '📧',
    'call': '📞',
    'report': '📊',
    'presentation': '📽️',
    'document': '📄',
    'write': '✍️',
    'code': '💻',
    'debug': '🐛',
    'deploy': '🚀',
    'review': '👀',
    'plan': '📋',
    'project': '🎯',
    
    // Health & Fitness
    'exercise': '💪',
    'gym': '🏋️',
    'run': '🏃',
    'walk': '🚶',
    'yoga': '🧘',
    'meditate': '🧘',
    'sleep': '😴',
    'doctor': '👨‍⚕️',
    'medicine': '💊',
    'health': '❤️',
    
    // Learning & Education
    'study': '📚',
    'learn': '🎓',
    'read': '📖',
    'book': '📕',
    'course': '🎓',
    'practice': '🎯',
    'homework': '📝',
    'exam': '📝',
    'research': '🔬',
    
    // Home & Chores
    'clean': '🧹',
    'laundry': '👕',
    'dishes': '🍽️',
    'vacuum': '🧹',
    'organize': '📦',
    'declutter': '🗑️',
    'trash': '🗑️',
    'repair': '🔧',
    'fix': '🔨',
    'paint': '🎨',
    
    // Finance
    'pay': '💰',
    'bill': '💵',
    'bank': '🏦',
    'budget': '💰',
    'money': '💵',
    'invest': '📈',
    'save': '💎',
    
    // Transportation
    'drive': '🚗',
    'car': '🚗',
    'bus': '🚌',
    'train': '🚆',
    'flight': '✈️',
    'travel': '🌍',
    'trip': '🧳',
    'vacation': '🏖️',
    
    // Entertainment & Leisure
    'movie': '🎬',
    'music': '🎵',
    'game': '🎮',
    'party': '🎉',
    'birthday': '🎂',
    'celebrate': '🎊',
    'hobby': '🎨',
    'photo': '📸',
    'video': '🎥',
    
    // Communication
    'chat': '💬',
    'message': '💬',
    'text': '📱',
    'reply': '↩️',
    'share': '🔗',
    
    // Nature & Outdoors
    'garden': '🌱',
    'plant': '🌿',
    'flower': '🌸',
    'nature': '🌳',
    'park': '🏞️',
    'hike': '⛰️',
    'beach': '🏖️',
    
    // Pets
    'dog': '🐕',
    'cat': '🐱',
    'pet': '🐾',
    'vet': '🏥',
    'feed': '🍖',
    
    // Special occasions
    'wedding': '💒',
    'anniversary': '💑',
    'gift': '🎁',
    'surprise': '🎁',
    
    // Urgent/Important
    'urgent': '⚠️',
    'important': '❗',
    'asap': '🚨',
    'deadline': '⏰',
    'reminder': '⏰',
  };
  
  // Check for keywords in the task text
  for (const [keyword, emoji] of Object.entries(emojiMap)) {
    if (text.includes(keyword)) {
      return emoji;
    }
  }
  
  // Check for question marks
  if (text.includes('?')) {
    return '❓';
  }
  
  // Check for exclamation marks (excitement)
  if (text.includes('!')) {
    return '⭐';
  }
  
  // Default emoji
  return '📌';
}

