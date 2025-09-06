/**
 * Unit Tests for skillGap module
 * Tests various scenarios for skill gap analysis
 */

const { skillGap, getSkillPriority, normalizeSkills, SKILL_FREQUENCY_MAP } = require('./skillGap');

describe('skillGap Module', () => {
  
  describe('skillGap function', () => {
    
    test('Scenario 1: Complete beginner - no matching skills', () => {
      const profileSkills = ['microsoft word', 'email management', 'basic math'];
      const requiredSkills = ['javascript', 'react', 'node.js', 'sql', 'git'];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      expect(result.have).toEqual([]);
      expect(result.missing).toEqual(['javascript', 'react', 'node.js', 'sql', 'git']);
      expect(result.missing_count).toBe(5);
      expect(result.priority).toHaveLength(5);
      
      // Check that skills are prioritized correctly (javascript should be high priority)
      expect(result.priority[0].skill).toBe('javascript');
      expect(result.priority[0].reason).toContain('Critical skill');
      
      // Git should also be high priority
      const gitPriority = result.priority.find(p => p.skill === 'git');
      expect(gitPriority).toBeDefined();
      expect(gitPriority.reason).toContain('Critical skill');
    });

    test('Scenario 2: Experienced developer with some gaps', () => {
      const profileSkills = ['JavaScript', 'HTML', 'CSS', 'Python', 'GIT'];
      const requiredSkills = ['javascript', 'react', 'node.js', 'typescript', 'docker', 'aws'];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      expect(result.have).toEqual(['javascript']);
      expect(result.missing).toEqual(['react', 'node.js', 'typescript', 'docker', 'aws']);
      expect(result.missing_count).toBe(5);
      
      // Check priority ordering - React and AWS should be highest priority (tied at 85)
      const topTwoSkills = [result.priority[0].skill, result.priority[1].skill].sort();
      expect(topTwoSkills).toEqual(['aws', 'react']);
      
      // Node.js and TypeScript should be next (tied at 80)
      const nextTwoSkills = [result.priority[2].skill, result.priority[3].skill].sort();
      expect(nextTwoSkills).toEqual(['node.js', 'typescript']);
      
      // Docker should be last (75)
      expect(result.priority[4].skill).toBe('docker');
    });

    test('Scenario 3: Well-matched candidate with minor gaps', () => {
      const profileSkills = ['React', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'Git'];
      const requiredSkills = ['react', 'javascript', 'node.js', 'typescript', 'jest'];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      expect(result.have).toEqual(['react', 'javascript', 'node.js']);
      expect(result.missing).toEqual(['typescript', 'jest']);
      expect(result.missing_count).toBe(2);
      
      // TypeScript should have higher priority than Jest
      expect(result.priority[0].skill).toBe('typescript');
      expect(result.priority[1].skill).toBe('jest');
    });

    test('Edge case: Empty arrays', () => {
      const result = skillGap([], []);
      
      expect(result.have).toEqual([]);
      expect(result.missing).toEqual([]);
      expect(result.missing_count).toBe(0);
      expect(result.priority).toEqual([]);
    });

    test('Edge case: No required skills', () => {
      const profileSkills = ['javascript', 'python'];
      const requiredSkills = [];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      expect(result.have).toEqual([]);
      expect(result.missing).toEqual([]);
      expect(result.missing_count).toBe(0);
      expect(result.priority).toEqual([]);
    });

    test('Edge case: All skills already possessed', () => {
      const profileSkills = ['JavaScript', 'React', 'Node.js', 'TypeScript'];
      const requiredSkills = ['javascript', 'react', 'node.js'];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      expect(result.have).toEqual(['javascript', 'react', 'node.js']);
      expect(result.missing).toEqual([]);
      expect(result.missing_count).toBe(0);
      expect(result.priority).toEqual([]);
    });

    test('Error handling: Invalid input types', () => {
      expect(() => skillGap('not an array', [])).toThrow('Both profileSkills and requiredSkills must be arrays');
      expect(() => skillGap([], 'not an array')).toThrow('Both profileSkills and requiredSkills must be arrays');
      expect(() => skillGap(null, [])).toThrow('Both profileSkills and requiredSkills must be arrays');
    });

    test('Handles mixed case and whitespace', () => {
      const profileSkills = ['  JavaScript  ', 'REACT', 'html '];
      const requiredSkills = ['javascript', 'react', 'html', 'css'];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      expect(result.have).toEqual(['javascript', 'react', 'html']);
      expect(result.missing).toEqual(['css']);
      expect(result.missing_count).toBe(1);
    });

    test('Data Science career path scenario', () => {
      const profileSkills = ['Python', 'Excel', 'Statistics'];
      const requiredSkills = ['python', 'machine learning', 'sql', 'tableau', 'r programming', 'statistics'];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      expect(result.have).toEqual(['python', 'statistics']);
      expect(result.missing).toEqual(['machine learning', 'sql', 'tableau', 'r programming']);
      expect(result.missing_count).toBe(4);
      
      // SQL should be highest priority among missing skills
      expect(result.priority[0].skill).toBe('sql');
      expect(result.priority[1].skill).toBe('machine learning');
    });
  });

  describe('getSkillPriority function', () => {
    test('Returns correct priority for known skills', () => {
      expect(getSkillPriority('javascript')).toBe(95);
      expect(getSkillPriority('JavaScript')).toBe(95); // Case insensitive
      expect(getSkillPriority('  python  ')).toBe(90); // Handles whitespace
    });

    test('Returns default priority for unknown skills', () => {
      expect(getSkillPriority('unknown skill')).toBe(50);
      expect(getSkillPriority('some random skill')).toBe(50);
    });
  });

  describe('normalizeSkills function', () => {
    test('Normalizes skill names correctly', () => {
      const skills = ['  JavaScript  ', 'PYTHON', 'Html', '  '];
      const normalized = normalizeSkills(skills);
      
      expect(normalized).toEqual(['javascript', 'python', 'html']);
    });

    test('Handles empty and invalid inputs', () => {
      expect(normalizeSkills([])).toEqual([]);
      expect(normalizeSkills(null)).toEqual([]);
      expect(normalizeSkills(undefined)).toEqual([]);
      expect(normalizeSkills(['', '  ', null, undefined, 123])).toEqual([]);
    });

    test('Filters out non-string values', () => {
      const skills = ['javascript', 123, null, 'python', undefined, ''];
      const normalized = normalizeSkills(skills);
      
      expect(normalized).toEqual(['javascript', 'python']);
    });
  });

  describe('Priority reasoning', () => {
    test('Critical skills have appropriate reasoning', () => {
      const profileSkills = [];
      const requiredSkills = ['javascript', 'communication', 'git'];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      result.priority.forEach(item => {
        expect(item.reason).toContain('Critical skill');
      });
    });

    test('Lower priority skills have appropriate reasoning', () => {
      const profileSkills = [];
      const requiredSkills = ['figma', 'photoshop'];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      result.priority.forEach(item => {
        expect(item.reason).toMatch(/Important skill|Valuable skill|Nice-to-have skill/);
      });
    });
  });

  describe('Real-world scenarios', () => {
    test('Frontend Developer position analysis', () => {
      const profileSkills = ['HTML', 'CSS', 'JavaScript', 'jQuery'];
      const requiredSkills = ['html', 'css', 'javascript', 'react', 'typescript', 'git', 'figma'];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      expect(result.have).toEqual(['html', 'css', 'javascript']);
      expect(result.missing).toEqual(['react', 'typescript', 'git', 'figma']);
      expect(result.missing_count).toBe(4);
      
      // Git should be highest priority, then React, then TypeScript, then Figma
      expect(result.priority[0].skill).toBe('git');
      expect(result.priority[1].skill).toBe('react');
      expect(result.priority[2].skill).toBe('typescript');
      expect(result.priority[3].skill).toBe('figma');
    });

    test('Cloud Engineer position analysis', () => {
      const profileSkills = ['Linux', 'Python', 'networking'];
      const requiredSkills = ['aws', 'docker', 'kubernetes', 'python', 'ci/cd', 'git'];
      
      const result = skillGap(profileSkills, requiredSkills);
      
      expect(result.have).toEqual(['python']);
      expect(result.missing).toEqual(['aws', 'docker', 'kubernetes', 'ci/cd', 'git']);
      expect(result.missing_count).toBe(5);
      
      // Git and AWS should be highest priorities
      expect(result.priority[0].skill).toBe('git');
      expect(result.priority[1].skill).toBe('aws');
    });
  });
});
