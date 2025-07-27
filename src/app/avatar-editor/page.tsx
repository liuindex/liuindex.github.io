'use client';

import { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toPng, toJpeg } from 'html-to-image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HexColorPicker } from 'react-colorful';
import { Download, Upload, Image as ImageIcon, Flag, Square, Circle, Copy, Check } from 'lucide-react';

// 国旗数据
const FLAGS = [
  { id: 'china', name: '中国', src: '/flags/china.svg' },
  { id: 'usa', name: '美国', src: '/flags/usa.svg' },
  { id: 'uk', name: '英国', src: '/flags/uk.svg' },
  { id: 'japan', name: '日本', src: '/flags/japan.svg' },
  { id: 'korea', name: '韩国', src: '/flags/korea.svg' },
  { id: 'france', name: '法国', src: '/flags/france.svg' },
  { id: 'germany', name: '德国', src: '/flags/germany.svg' },
  { id: 'italy', name: '意大利', src: '/flags/italy.svg' },
  { id: 'canada', name: '加拿大', src: '/flags/canada.svg' },
  { id: 'australia', name: '澳大利亚', src: '/flags/australia.svg' },
];

export default function AvatarEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);
  const [borderWidth, setBorderWidth] = useState(20);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isSquare, setIsSquare] = useState(true); // 默认为正方形
  const [flagPosition, setFlagPosition] = useState('topRight'); // 默认右上角
  const [flagSize, setFlagSize] = useState(25); // 默认为头像的四分之一（25%）
  const [isCopied, setIsCopied] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  // 处理图片上传
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
  });

  // 下载头像
  const downloadAvatar = (format: 'png' | 'jpeg') => {
    if (!avatarRef.current) return;

    const exportFn = format === 'png' ? toPng : toJpeg;
    const fileExtension = format === 'png' ? 'png' : 'jpg';

    exportFn(avatarRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `avatar-with-flag.${fileExtension}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('导出图片失败:', err);
      });
  };

  // 复制到剪贴板
  const copyToClipboard = async () => {
    if (!avatarRef.current) return;
    
    try {
      const dataUrl = await toPng(avatarRef.current, { cacheBust: true });
      
      // 创建一个图片元素来获取图像数据
      const img = new Image();
      img.src = dataUrl;
      
      // 等待图片加载
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // 创建一个canvas元素
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      // 在canvas上绘制图像
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        // 将canvas转换为blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            // 创建ClipboardItem并写入剪贴板
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            
            // 显示复制成功提示
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }
        }, 'image/png');
      }
    } catch (err) {
      console.error('复制到剪贴板失败:', err);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <h1 className="text-3xl font-bold tracking-tighter p-4 text-center">头像编辑器</h1>
      
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧预览区域 - 固定宽度，可独立滚动 */}
        <div className="w-1/2 p-4 overflow-y-auto">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="upload">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="upload">上传头像</TabsTrigger>
                  <TabsTrigger value="preview">预览效果</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-4">
                  <div 
                    {...getRootProps()} 
                    className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'}`}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Upload className="h-12 w-12 text-muted-foreground" />
                      {image ? (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">已上传头像</p>
                          <p className="text-xs text-muted-foreground">点击或拖拽更换头像</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">点击或拖拽上传头像</p>
                          <p className="text-xs text-muted-foreground">支持 JPG, PNG, GIF 格式</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {image && (
                    <div className="flex justify-center">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src={image} alt="上传的头像" />
                        <AvatarFallback>头像</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-6">
                  {image ? (
                    <div className="flex flex-col items-center space-y-6">
                      <div 
                        ref={avatarRef} 
                        className={`relative w-64 h-64 ${isSquare ? 'rounded-md' : 'rounded-full'} overflow-hidden`}
                        style={{ 
                          backgroundColor: borderColor,
                        }}
                      >
                        <div 
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ 
                            padding: `${borderWidth}px`,
                          }}
                        >
                          <div className={`w-full h-full ${isSquare ? 'rounded-md' : 'rounded-full'} overflow-hidden relative`}>
                            <img 
                              src={image} 
                              alt="头像" 
                              className="w-full h-full object-cover"
                            />
                            {selectedFlag && (
                              <div 
                                className={`absolute pointer-events-none ${
                                  flagPosition === 'topLeft' ? 'top-0 left-0' : 
                                  flagPosition === 'topRight' ? 'top-0 right-0' : 
                                  flagPosition === 'bottomLeft' ? 'bottom-0 left-0' : 
                                  'bottom-0 right-0'
                                }`}
                                style={{
                                  width: `${flagSize}%`,
                                  height: `${flagSize}%`,
                                }}
                              >
                                <img 
                                  src={FLAGS.find(f => f.id === selectedFlag)?.src} 
                                  alt="国旗" 
                                  className="w-full h-full object-cover opacity-70"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button onClick={() => downloadAvatar('png')}>
                          <Download className="h-4 w-4" /> 下载 PNG
                        </Button>
                        <Button onClick={() => downloadAvatar('jpeg')} variant="outline">
                          <Download className="h-4 w-4" /> 下载 JPG
                        </Button>
                        <Button onClick={copyToClipboard} variant="secondary">
                          {isCopied ? (
                            <>
                              <Check className="h-4 w-4" /> 已复制
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" /> 复制
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4 text-muted-foreground">
                      <ImageIcon className="h-12 w-12" />
                      <p>请先上传头像</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 右侧编辑区域 - 可独立滚动 */}
        <div className="w-1/2 p-4 overflow-y-auto">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Flag className="mr-2 h-4 w-4" /> 选择国旗
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FLAGS.map((flag) => (
                    <div 
                      key={flag.id}
                      className={`border rounded-md p-2 cursor-pointer transition-all ${selectedFlag === flag.id ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/50'}`}
                      onClick={() => setSelectedFlag(flag.id)}
                    >
                      <div className="aspect-video relative overflow-hidden rounded">
                        <img 
                          src={flag.src} 
                          alt={flag.name} 
                          className="w-full h-full object-cover opacity-70"
                        />
                      </div>
                      <p className="text-xs text-center mt-1">{flag.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Square className="mr-2 h-4 w-4" /> 头像形状
                </h3>
                <div className="flex space-x-2">
                  <Button 
                    variant={isSquare ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsSquare(true)}
                    className="flex-1"
                  >
                    <Square className="mr-2 h-4 w-4" /> 正方形
                  </Button>
                  <Button 
                    variant={!isSquare ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsSquare(false)}
                    className="flex-1"
                  >
                    <Circle className="mr-2 h-4 w-4" /> 圆形
                  </Button>
                </div>
              </div>

              {selectedFlag && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">国旗位置</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={flagPosition === 'topLeft' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFlagPosition('topLeft')}
                    >
                      左上角
                    </Button>
                    <Button 
                      variant={flagPosition === 'topRight' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFlagPosition('topRight')}
                    >
                      右上角
                    </Button>
                    <Button 
                      variant={flagPosition === 'bottomLeft' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFlagPosition('bottomLeft')}
                    >
                      左下角
                    </Button>
                    <Button 
                      variant={flagPosition === 'bottomRight' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFlagPosition('bottomRight')}
                    >
                      右下角
                    </Button>
                  </div>
                </div>
              )}

              {selectedFlag && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">国旗大小</h3>
                  <Slider
                    value={[flagSize]}
                    min={10}
                    max={50}
                    step={1}
                    onValueChange={(value) => setFlagSize(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10%</span>
                    <span>{flagSize}%</span>
                    <span>50%</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-medium">边框宽度</h3>
                <Slider
                  value={[borderWidth]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={(value) => setBorderWidth(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0px</span>
                  <span>{borderWidth}px</span>
                  <span>50px</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">边框颜色</h3>
                <div 
                  className="h-10 rounded-md cursor-pointer border"
                  style={{ backgroundColor: borderColor }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
                {showColorPicker && (
                  <div className="relative z-10">
                    <HexColorPicker 
                      color={borderColor} 
                      onChange={setBorderColor} 
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}