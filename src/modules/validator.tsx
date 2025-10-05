import React, { FC, useState, useRef, useEffect } from 'react';
import { VALID_TICKET_IDS } from '../data.ts';

export const ValidatorLoginScreen: FC<{ onLogin: () => void }> = ({ onLogin }) => (
  <div className="screen" style={{ justifyContent: 'center' }}>
    <div className="header">
      <h1 className="header-title">Acesso da Equipe</h1>
      <p className="header-subtitle">Validador de Ingressos</p>
    </div>
    <div className="form-group">
      <label htmlFor="validator-email">Email da Equipe</label>
      <input type="email" id="validator-email" defaultValue="staff@rave.com" />
    </div>
    <div className="form-group">
      <label htmlFor="validator-password">Senha</label>
      <input type="password" id="validator-password" defaultValue="********" />
    </div>
    <button className="btn btn-primary" onClick={onLogin}>Entrar</button>
  </div>
);

export const ValidatorScannerScreen: FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [scanResult, setScanResult] = useState<'valid' | 'invalid' | null>(null);
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        const startCamera = async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (error) {
                    console.error("Erro ao acessar a câmera: ", error);
                }
            }
        };
        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleMockScan = () => {
        if (!isScanning) return;

        const isSuccess = Math.random() > 0.3;
        const data = isSuccess 
            ? VALID_TICKET_IDS[Math.floor(Math.random() * VALID_TICKET_IDS.length)]
            : 'INVALID-QR-CODE-DATA';

        setScannedData(data);
        setIsScanning(false);

        if (VALID_TICKET_IDS.includes(data)) {
            setScanResult('valid');
        } else {
            setScanResult('invalid');
        }

        setTimeout(() => {
            resetScanner();
        }, 3000);
    };
    
    const resetScanner = () => {
        setScanResult(null);
        setScannedData(null);
        setIsScanning(true);
    };

    return (
        <div className="screen scanner-screen">
            <div className="scanner-header">
                <h2>Validador de Ingresso</h2>
                <button onClick={onLogout} className="logout-button">Sair</button>
            </div>
            <div className="camera-container">
                <video ref={videoRef} autoPlay playsInline className="camera-feed" aria-label="Visualização da câmera"></video>
                <div className="scanner-overlay" aria-hidden="true">
                    <div className="scanner-box"></div>
                    <p>Aponte a câmera para o QR Code</p>
                </div>

                {scanResult && (
                    <div className={`scan-result-overlay ${scanResult}`} role="alert">
                        <div className="result-icon">{scanResult === 'valid' ? '✓' : '✗'}</div>
                        <h2>{scanResult === 'valid' ? 'Ingresso Válido' : 'Ingresso Inválido'}</h2>
                        {scannedData && <p className="scanned-data-info">{scanResult === 'valid' ? `ID: ${scannedData.split('-')[2]}` : 'Código não reconhecido'}</p>}
                    </div>
                )}
            </div>
            <div className="scanner-controls">
                {isScanning ? (
                     <button className="btn btn-primary" onClick={handleMockScan}>Simular Leitura</button>
                ) : (
                    <button className="btn btn-secondary" onClick={resetScanner}>Ler Próximo Ingresso</button>
                )}
            </div>
        </div>
    );
};
