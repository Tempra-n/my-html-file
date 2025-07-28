import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Pause, RotateCcw, Star, Target, Calendar, BookOpen, MessageCircle, Award, Heart, Globe, Users, Home, Shield, Leaf, Mountain, Waves, Sun, Moon } from 'lucide-react';

const AnimatedTaiwanCulture = () => {
  const [currentEra, setCurrentEra] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAspect, setSelectedAspect] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(3000);

  const historicalEras = [
    {
      period: '先史時代～1624年',
      title: '原住民族の時代',
      description: '台湾最初の住民たち',
      details: '16の原住民族が独自の文化と言語を築く。狩猟・農業・漁業で豊かな生活。母系社会の伝統。',
      color: 'from-green-600 to-emerald-500',
      icon: Mountain,
      significance: '多様性の基盤となる文化的根源'
    },
    {
      period: '1624-1662年',
      title: 'オランダ・スペイン統治',
      description: '最初の国際化',
      details: 'オランダ東インド会社による南部統治。農業近代化とキリスト教布教。国際貿易の拠点化。',
      color: 'from-orange-500 to-yellow-500',
      icon: Waves,
      significance: '国際的視野の始まり'
    },
    {
      period: '1662-1683年',
      title: '鄭氏王朝（明朝復古）',
      description: '独立王国の誇り',
      details: '鄭成功による「反清復明」。台湾初の独立政権。中華文化の導入と原住民との融合。',
      color: 'from-red-500 to-pink-500',
      icon: Star,
      significance: '独立精神と文化融合の起源'
    },
    {
      period: '1683-1895年',
      title: '清朝統治',
      description: '本格的中華文化導入',
      details: '大陸からの大規模移民。福建・広東系の文化根付く。開港と近代化への道筋。',
      color: 'from-blue-500 to-indigo-500',
      icon: Home,
      significance: '現代台湾文化の基礎形成'
    },
    {
      period: '1895-1945年',
      title: '日本統治時代',
      description: '近代化の基礎建設',
      details: 'インフラ整備、教育制度、公衆衛生の向上。皇民化政策と文化的葛藤。技術革新。',
      color: 'from-purple-500 to-violet-500',
      icon: BookOpen,
      significance: '近代社会システムの構築'
    },
    {
      period: '1945-1987年',
      title: '戒厳令時代',
      description: '国民党統治と民主化への道',
      details: '大陸からの移民。戒厳令下での経済発展。228事件と白色テロ。民主化運動の高まり。',
      color: 'from-gray-600 to-slate-500',
      icon: Shield,
      significance: '民主主義への強い意志形成'
    },
    {
      period: '1987-現在',
      title: '民主化・多元化時代',
      description: '自由と多様性の開花',
      details: '戒厳令解除。言論の自由。LGBTQ+権利。アジア初同性婚合法化（2019年）。',
      color: 'from-rainbow-400 to-pink-500',
      icon: Heart,
      significance: 'あなたが求める価値観の実現'
    }
  ];

  const culturalAspects = [
    {
      name: 'LGBTQ+フレンドリー',
      icon: Heart,
      color: 'from-pink-500 to-purple-500',
      stats: '同性婚合法化アジア初（2019年）',
      details: [
        '毎年18万人参加のTaiwan Pride（10月開催）',
        'アジア最大規模のLGBTQ+イベント',
        '法的権利保護と社会的受容の両立',
        '公的機関でのLGBTQ+支援プログラム',
        '若い世代を中心とした高い理解度'
      ],
      personalRelevance: 'あなたのアイデンティティが自然に受け入れられる環境'
    },
    {
      name: '市民社会の活発さ',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
      stats: '99%の識字率、37%の高等教育率',
      details: [
        '哲学星期五（Philosophy Friday）毎週金曜の社会討論',
        'NGO・NPOが非常に活発',
        '社会問題への高い関心と参加',
        'ひまわり学生運動など市民運動の伝統',
        '政治・社会問題の日常的議論'
      ],
      personalRelevance: '社会問題への関心を共有できる仲間との出会い'
    },
    {
      name: '宗教的多様性と寛容',
      icon: Globe,
      color: 'from-green-500 to-teal-500',
      stats: '336のハラル認証施設、11のモスク',
      details: [
        '台北大清真寺を中心としたムスリムコミュニティ',
        'イード祭典への公的支援',
        '国立博物館でのイスラム文化展示',
        '仏教・道教・キリスト教との共存',
        '政府によるハラル食品認証制度'
      ],
      personalRelevance: 'イスラム教改宗への理解と支援環境'
    },
    {
      name: '女性の安全と地位',
      icon: Shield,
      color: 'from-emerald-500 to-green-500',
      stats: '女性一人旅世界3位の安全性',
      details: [
        '夜間でも安心して歩ける治安',
        '女性の社会進出率の高さ',
        '蔡英文元総統など女性リーダーの存在',
        '職場でのハラスメント対策',
        '公共交通機関での女性専用サービス'
      ],
      personalRelevance: '女性として安全で、男女平等が進んだ社会'
    },
    {
      name: '脱新自由主義的価値観',
      icon: Leaf,
      color: 'from-yellow-500 to-orange-500',
      stats: '社会保障制度の充実と共助精神',
      details: [
        '国民健康保険制度の手厚さ',
        '労働者の権利保護',
        'ワークライフバランス重視',
        '環境保護と持続可能性への取り組み',
        'コミュニティ重視の文化'
      ],
      personalRelevance: '新自由主義以外の生き方が受け入れられる場所'
    },
    {
      name: '食文化と生活の質',
      icon: Sun,
      color: 'from-red-500 to-pink-500',
      stats: '東京より21-26%安い生活費',
      details: [
        '24時間営業の夜市と屋台文化',
        '多様な料理（台湾・中華・日本・東南アジア）',
        'ハラル食品の豊富な選択肢',
        '優れた公共交通（月額4,100円無制限）',
        '家賃日本より40-50%安い'
      ],
      personalRelevance: '経済的に現実的で質の高い生活'
    }
  ];

  const personalJourney = [
    {
      phase: '準備期間',
      period: '2025年8月-10月',
      goals: ['中国語学習（HSK3級目標）', 'Taiwan Gold Card要件調査', 'Share House予約', 'NGOプログラム応募'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      phase: '体験滞在',
      period: '2025年11月～3ヶ月',
      goals: ['公館エリア生活開始', 'Philosophy Friday参加', 'One-Forty NGOボランティア', 'Taiwan Pride参加'],
      color: 'from-green-400 to-green-600'
    },
    {
      phase: '適応評価',
      period: '2026年2月',
      goals: ['台北生活適応度評価', '長期滞在決定', 'Gold Card申請開始', 'ローカルコミュニティ深化'],
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      phase: '本格定住',
      period: '2026年5月以降',
      goals: ['NGO就職活動', '永住権申請準備', '日台架け橋活動', '自然体での生活確立'],
      color: 'from-purple-400 to-purple-600'
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentEra((prev) => (prev + 1) % historicalEras.length);
      }, animationSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, animationSpeed]);

  const CulturalCard = ({ aspect, index }) => {
    const isSelected = selectedAspect === index;
    const IconComponent = aspect.icon;
    
    return (
      <div 
        className={`relative p-6 rounded-xl transition-all duration-1000 cursor-pointer transform hover:scale-105 ${
          isSelected 
            ? `bg-gradient-to-r ${aspect.color} text-white shadow-2xl scale-105` 
            : 'bg-white text-gray-700 shadow-lg hover:shadow-xl border-2 border-gray-100 hover:border-pink-200'
        }`}
        onClick={() => setSelectedAspect(isSelected ? null : index)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <IconComponent className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-pink-600'}`} />
            <div>
              <h3 className="font-bold text-lg">{aspect.name}</h3>
              <p className={`text-sm ${isSelected ? 'text-pink-100' : 'text-gray-500'}`}>{aspect.stats}</p>
            </div>
          </div>
        </div>
        
        {isSelected && (
          <div className="mt-4 space-y-3 animate-fadeIn">
            <div className="space-y-2">
              {aspect.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="text-sm">{detail}</p>
                </div>
              ))}
            </div>
            <div className="bg-yellow-400 bg-opacity-30 rounded-lg p-4 mt-4">
              <h4 className="font-semibold mb-2">あなたにとっての意味:</h4>
              <p className="text-sm">{aspect.personalRelevance}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🌈 台湾：多様性と包容力の島
          </h1>
          <p className="text-2xl text-gray-700 mb-4">歴史が育んだ自由と寛容の文化</p>
          <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
            <h3 className="font-bold text-xl mb-4 text-gray-800">🏳️‍🌈 なぜ台北があなたにとって理想的なのか</h3>
            <p className="text-gray-600 leading-relaxed">
              400年の多様な統治経験が育んだ包容力。LGBTQ+への理解、社会問題への関心、宗教的寛容性、
              女性の安全、新自由主義以外の価値観—すべてがここにあります。
            </p>
          </div>
          
          {/* コントロールパネル */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? 'ポーズ' : '歴史の旅を開始'}</span>
            </button>
            
            <button
              onClick={() => {
                setCurrentEra(0);
                setIsPlaying(false);
              }}
              className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
              <span>リセット</span>
            </button>
          </div>

          {/* スピード調整 */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className="text-gray-600">アニメーション速度:</span>
            <input
              type="range"
              min="2000"
              max="5000"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-gray-600">{(animationSpeed/1000).toFixed(1)}秒</span>
          </div>
        </div>

        {/* 歴史タイムライン */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">📜 台湾400年の歴史：多様性が生んだ包容力</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 rounded-full"></div>
            <div className="space-y-16">
              {historicalEras.map((era, index) => {
                const IconComponent = era.icon;
                const isActive = index <= currentEra;
                const isCurrent = index === currentEra;
                
                return (
                  <div
                    key={index}
                    className={`relative flex items-center justify-center transition-all duration-1000 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-90'
                    }`}
                  >
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white shadow-lg transition-all duration-500 flex items-center justify-center ${
                      isCurrent ? `bg-gradient-to-r ${era.color} animate-pulse scale-125` : 
                      isActive ? `bg-gradient-to-r ${era.color}` : 'bg-gray-300'
                    }`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className={`${index % 2 === 0 ? 'mr-auto pr-12' : 'ml-auto pl-12'} w-5/12`}>
                      <div className={`p-6 rounded-xl shadow-lg transition-all duration-500 ${
                        isCurrent ? `bg-gradient-to-r ${era.color} text-white shadow-2xl scale-105` :
                        isActive ? 'bg-white border-2 border-purple-200' : 'bg-gray-100'
                      }`}>
                        <div className="mb-3">
                          <span className={`text-sm font-medium ${isCurrent ? 'text-purple-100' : 'text-purple-600'}`}>
                            {era.period}
                          </span>
                        </div>
                        <h3 className={`text-2xl font-bold mb-3 ${isCurrent ? 'text-white' : 'text-gray-800'}`}>
                          {era.title}
                        </h3>
                        <p className={`text-lg mb-3 ${isCurrent ? 'text-purple-100' : 'text-gray-600'}`}>
                          {era.description}
                        </p>
                        <p className={`text-sm mb-4 ${isCurrent ? 'text-purple-50' : 'text-gray-600'}`}>
                          {era.details}
                        </p>
                        <div className={`${isCurrent ? 'bg-white bg-opacity-20' : 'bg-purple-50'} rounded-lg p-3`}>
                          <p className={`text-sm font-semibold ${isCurrent ? 'text-white' : 'text-purple-700'}`}>
                            現代への影響: {era.significance}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 現代台湾文化 */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">🌈 現代台湾文化：あなたが求める価値観の実現</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {culturalAspects.map((aspect, index) => (
              <CulturalCard key={index} aspect={aspect} index={index} />
            ))}
          </div>
        </div>

        {/* 個人的な旅路 */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">🗺️ あなたの台北移住計画</h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {personalJourney.map((phase, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br ${phase.color} text-white shadow-lg`}
                >
                  <h3 className="text-xl font-bold mb-3">{phase.phase}</h3>
                  <p className="text-sm opacity-90 mb-4">{phase.period}</p>
                  <div className="space-y-2">
                    {phase.goals.map((goal, goalIndex) => (
                      <div key={goalIndex} className="bg-white bg-opacity-20 rounded p-2 text-sm">
                        ✓ {goal}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 実用的情報 */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">💡 実用的な生活情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white p-6 rounded-xl shadow-lg">
              <Home className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-3">住居</h3>
              <ul className="space-y-2 text-sm">
                <li>• Share House: 36,000-69,000円/月</li>
                <li>• 公館エリア（台大周辺）推奨</li>
                <li>• 家賃は日本より40-50%安い</li>
                <li>• 安全で便利な立地</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white p-6 rounded-xl shadow-lg">
              <Users className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-3">コミュニティ</h3>
              <ul className="space-y-2 text-sm">
                <li>• 哲学星期五（毎週金曜討論会）</li>
                <li>• One-Forty NGOボランティア</li>
                <li>• Taiwan Pride（10月）</li>
                <li>• 国際開発NGOプログラム</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-6 rounded-xl shadow-lg">
              <Target className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-3">月額予算</h3>
              <ul className="space-y-2 text-sm">
                <li>• 宿泊費: 40,000円</li>
                <li>• 食費: 25,000円</li>
                <li>• 交通費: 4,100円</li>
                <li>• その他: 20,000円</li>
                <li>• <strong>合計: 89,100円/月</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* なぜ台北なのか */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-8">💖 なぜ台北があなたにとって完璧なのか</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🌈 求めていた環境がすべてここに</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-pink-300 mt-1 flex-shrink-0" />
                  <span>LGBTQ+への理解と支援が当たり前の社会</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                  <span>社会問題や政治への関心を共有する仲間</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Globe className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                  <span>宗教的寛容性のある環境</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-yellow-300 mt-1 flex-shrink-0" />
                  <span>女性として安全で平等な社会</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Leaf className="w-6 h-6 text-emerald-300 mt-1 flex-shrink-0" />
                  <span>新自由主義以外の生き方が受け入れられる</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">🚀 これは逃避ではなく前進</h3>
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <p className="text-lg leading-relaxed">
                  日本で「変人」として疲弊し続けるより、自分らしさを活かして社会貢献できる環境で
                  新しい人生を始める方が、あなたにとって健康的で建設的な選択です。
                </p>
                <p className="text-lg leading-relaxed mt-4 font-semibold">
                  台北は、あなたが自然体で生き、社会に貢献し、真の仲間と出会える場所です。
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-current text-yellow-300 animate-pulse" style={{animationDelay: `${i * 200}ms`}} />
              ))}
            </div>
            <p className="text-2xl font-bold mt-4">あなたの新しい人生が台北で始まります 🌟</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .from-rainbow-400 {
          background: linear-gradient(-45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #fd79a8);
          background-size: 400% 400%;
          animation: rainbow 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedTaiwanCulture;