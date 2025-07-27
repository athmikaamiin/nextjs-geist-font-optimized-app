import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  history: string;
  conditions: string;
  relationship: string;
}

const FamilyManagement = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [form, setForm] = useState<Omit<FamilyMember, 'id'>>({
    name: '',
    age: 0,
    history: '',
    conditions: '',
    relationship: '',
  });
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ 
      ...form, 
      [name]: name === 'age' ? parseInt(value) || 0 : value 
    });
  };

  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      setError('Name is required.');
      return false;
    }
    if (form.age <= 0 || form.age > 150) {
      setError('Please provide a valid age between 1 and 150.');
      return false;
    }
    if (!form.relationship.trim()) {
      setError('Relationship is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isEditing) {
      setMembers(members.map(member => 
        member.id === isEditing 
          ? { ...form, id: isEditing }
          : member
      ));
      setIsEditing(null);
    } else {
      const newMember: FamilyMember = {
        ...form,
        id: Date.now().toString(),
      };
      setMembers([...members, newMember]);
    }

    setForm({ name: '', age: 0, history: '', conditions: '', relationship: '' });
    setError('');
  };

  const handleEdit = (member: FamilyMember) => {
    setForm({
      name: member.name,
      age: member.age,
      history: member.history,
      conditions: member.conditions,
      relationship: member.relationship,
    });
    setIsEditing(member.id);
    setError('');
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setForm({ name: '', age: 0, history: '', conditions: '', relationship: '' });
    setError('');
  };

  return (
    <section className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Family Health Management</h2>
        <p className="text-gray-600">Keep track of your family members' health information and medical history</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {isEditing ? 'Edit Family Member' : 'Add Family Member'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter full name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={form.age || ''}
                  onChange={handleChange}
                  min="1"
                  max="150"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship *
                </label>
                <select
                  name="relationship"
                  value={form.relationship}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select relationship</option>
                  <option value="Self">Self</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Grandparent">Grandparent</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical History
              </label>
              <textarea
                name="history"
                value={form.history}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="Previous surgeries, major illnesses, allergies..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Conditions
              </label>
              <input
                type="text"
                name="conditions"
                value={form.conditions}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Diabetes, hypertension, etc."
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                {isEditing ? 'Update Member' : 'Add Member'}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Members List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Family Members ({members.length})
          </h3>
          
          {members.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl text-gray-400 mb-4">👥</div>
              <p className="text-gray-500">No family members added yet.</p>
              <p className="text-gray-400 text-sm mt-1">Add your first family member using the form.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {members.map((member) => (
                <div key={member.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.relationship} • {member.age} years old</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {member.history && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-700 mb-1">Medical History:</p>
                      <p className="text-sm text-gray-600">{member.history}</p>
                    </div>
                  )}
                  
                  {member.conditions && (
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1">Current Conditions:</p>
                      <p className="text-sm text-gray-600">{member.conditions}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy & Security</h3>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• All family health information is encrypted and stored securely</li>
          <li>• Only you have access to your family's health data</li>
          <li>• Information can be updated or deleted at any time</li>
          <li>• Use this data to get personalized health insights from our AI assistant</li>
        </ul>
      </div>
    </section>
  );
};

export default FamilyManagement;
