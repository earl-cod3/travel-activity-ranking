import { useState } from 'react';
import { useActivityRanking } from './useActivityRanking';

export function ActivityRankingPage() {
    const [city, setCity] = useState('');
    const { data, loading, error, rank } = useActivityRanking();

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: '4rem auto',
                padding: '2rem',
                fontFamily: 'Inter, system-ui, sans-serif',
            }}
        >
            <h1 style={{ marginBottom: '2rem' }}>Activity Ranking</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '0.6rem 0.8rem',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                    }}
                />

                <button
                    onClick={() => rank(city)}
                    disabled={loading}
                    style={{
                        padding: '0.6rem 1rem',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: loading ? '#94a3b8' : '#2563eb',
                        color: 'white',
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? 'Ranking...' : 'Rank Activities'}
                </button>

            </div>

            {loading && <p>Ranking activities...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {data && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {data.map((item, index) => (
                        <div
                            key={item.activity}
                            style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <strong>
                                    {index + 1}.{' '}
                                    {item.activity.replaceAll('_', ' ')}
                                </strong>
                                <span>{item.score}%</span>
                            </div>

                            <small style={{ color: '#d1d5db' }}>
                                {item.reasoning}
                            </small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
