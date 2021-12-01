EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A2 23386 16535
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L erun-rescue:Teensy4.0-teensy U4
U 1 1 618C47F0
P 10500 8450
F 0 "U4" H 10500 10065 50  0000 C CNN
F 1 "Teensy4.0" H 10500 9974 50  0000 C CNN
F 2 "teensy:Teensy40" H 10100 8650 50  0001 C CNN
F 3 "" H 10100 8650 50  0001 C CNN
	1    10500 8450
	1    0    0    -1  
$EndComp
$Comp
L power:+3.3V #PWR014
U 1 1 6198B2D9
P 11850 9300
F 0 "#PWR014" H 11850 9150 50  0001 C CNN
F 1 "+3.3V" H 11865 9473 50  0000 C CNN
F 2 "" H 11850 9300 50  0001 C CNN
F 3 "" H 11850 9300 50  0001 C CNN
	1    11850 9300
	1    0    0    -1  
$EndComp
Text Label 12000 9300 0    50   ~ 0
LV_REF
$Comp
L power:+5V #PWR012
U 1 1 6198BB4C
P 11850 9000
F 0 "#PWR012" H 11850 8850 50  0001 C CNN
F 1 "+5V" H 11865 9173 50  0000 C CNN
F 2 "" H 11850 9000 50  0001 C CNN
F 3 "" H 11850 9000 50  0001 C CNN
	1    11850 9000
	1    0    0    -1  
$EndComp
Text Label 12000 9000 0    50   ~ 0
HV_REF
$Comp
L power:GND #PWR011
U 1 1 619B8330
P 8350 8900
F 0 "#PWR011" H 8350 8650 50  0001 C CNN
F 1 "GND" H 8355 8727 50  0000 C CNN
F 2 "" H 8350 8900 50  0001 C CNN
F 3 "" H 8350 8900 50  0001 C CNN
	1    8350 8900
	1    0    0    -1  
$EndComp
Wire Wire Line
	8350 8700 8350 8900
Wire Wire Line
	2350 2950 2100 2950
Text Label 2350 2950 0    50   ~ 0
S1_A1_HV-
Wire Wire Line
	2100 3050 2350 3050
Text Label 2350 3050 0    50   ~ 0
S1_A1_HV+
Wire Wire Line
	2100 2650 2350 2650
Wire Wire Line
	2350 2550 2100 2550
Text Label 2350 2650 0    50   ~ 0
S1_A2_HV+
Text Label 2350 1850 0    50   ~ 0
S1_A0_HV-
Text Label 2350 1950 0    50   ~ 0
S1_A0_HV+
Wire Wire Line
	2350 1850 2100 1850
Wire Wire Line
	2100 1950 2350 1950
Text Label 2350 2150 0    50   ~ 0
S1_AS_HV
Wire Wire Line
	2350 2150 2100 2150
$Comp
L power:GND #PWR03
U 1 1 619E3C39
P 2850 3150
F 0 "#PWR03" H 2850 2900 50  0001 C CNN
F 1 "GND" H 2855 2977 50  0000 C CNN
F 2 "" H 2850 3150 50  0001 C CNN
F 3 "" H 2850 3150 50  0001 C CNN
	1    2850 3150
	1    0    0    -1  
$EndComp
Wire Wire Line
	2100 2850 2200 2850
$Comp
L Connector:DB15_Female_MountingHoles J1
U 1 1 61970C5D
P 1800 2350
F 0 "J1" H 1955 2352 50  0000 L CNN
F 1 "HEIDENHAIN_MT25_TTL" H 1955 2261 50  0000 L CNN
F 2 "Connector_Dsub:DSUB-15_Female_Horizontal_P2.77x2.84mm_EdgePinOffset7.70mm_Housed_MountingHolesOffset9.12mm" H 1800 2350 50  0001 C CNN
F 3 " ~" H 1800 2350 50  0001 C CNN
	1    1800 2350
	-1   0    0    1   
$EndComp
Text Label 2350 2450 0    50   ~ 0
HV_REF
Text Label 2350 2550 0    50   ~ 0
S1_A2_HV-
Wire Wire Line
	2350 2450 2200 2450
Text Label 9050 8200 2    50   ~ 0
ADC_CS_LV
Wire Wire Line
	9050 8200 9400 8200
Wire Wire Line
	8350 8700 9400 8700
Text Label 9050 9000 2    50   ~ 0
ADC_CLK_LV
Wire Wire Line
	9050 9000 9400 9000
Text Label 9050 8400 2    50   ~ 0
ADC_MISO_LV
Wire Wire Line
	9050 8400 9400 8400
Text Label 9050 7400 2    50   ~ 0
S1_A2_LV
Text Label 9050 7200 2    50   ~ 0
S1_A0_LV
Wire Wire Line
	9400 7200 9050 7200
Wire Wire Line
	9050 7300 9400 7300
Wire Wire Line
	9400 7400 9050 7400
Text Label 9050 7300 2    50   ~ 0
S1_A1_LV
Wire Wire Line
	9400 7500 9050 7500
Text Label 9050 7500 2    50   ~ 0
S1_AS_LV
Wire Wire Line
	2850 2850 2850 3150
Wire Wire Line
	8450 5300 8800 5300
Text Label 8800 5300 0    50   ~ 0
S1_AS_LV
$Comp
L Logic_LevelTranslator:TXB0108DQSR U2
U 1 1 618C6CB9
P 8050 5400
F 0 "U2" H 8050 4611 50  0000 C CNN
F 1 "TXB0108DQSR" H 8050 4520 50  0000 C CNN
F 2 "TXB0108DQSR:SON40P400X200X55-20N" H 8050 4650 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/txb0108.pdf" H 8050 5300 50  0001 C CNN
	1    8050 5400
	-1   0    0    1   
$EndComp
Wire Wire Line
	7650 5000 7400 5000
Wire Wire Line
	8450 5000 8800 5000
Wire Wire Line
	8800 5100 8450 5100
Wire Wire Line
	8450 5200 8800 5200
Text Label 8800 5000 0    50   ~ 0
S1_A0_LV
Text Label 8800 5200 0    50   ~ 0
S1_A2_LV
Text Label 8800 5100 0    50   ~ 0
S1_A1_LV
Wire Wire Line
	8750 4400 8750 4550
Wire Wire Line
	8050 4400 8750 4400
$Comp
L power:GND #PWR05
U 1 1 61998562
P 8750 4550
F 0 "#PWR05" H 8750 4300 50  0001 C CNN
F 1 "GND" H 8755 4377 50  0000 C CNN
F 2 "" H 8750 4550 50  0001 C CNN
F 3 "" H 8750 4550 50  0001 C CNN
	1    8750 4550
	1    0    0    -1  
$EndComp
Wire Wire Line
	8150 6350 8150 6100
Text Label 8150 6350 3    50   ~ 0
LV_REF
Wire Wire Line
	7950 6350 7950 6100
Text Label 7950 6350 3    50   ~ 0
HV_REF
Text Label 7000 6300 2    50   ~ 0
S2_AS_HV
Wire Wire Line
	7400 5700 7650 5700
Text Label 7000 6000 2    50   ~ 0
S2_A0_HV
Text Label 7000 6200 2    50   ~ 0
S2_A2_HV
Text Label 7000 6100 2    50   ~ 0
S2_A1_HV
Wire Wire Line
	8450 5700 8800 5700
Text Label 8800 5700 0    50   ~ 0
S2_AS_LV
Wire Wire Line
	8450 5400 8800 5400
Wire Wire Line
	8800 5500 8450 5500
Wire Wire Line
	8450 5600 8800 5600
Text Label 8800 5400 0    50   ~ 0
S2_A0_LV
Text Label 8800 5600 0    50   ~ 0
S2_A2_LV
Text Label 8800 5500 0    50   ~ 0
S2_A1_LV
Text Label 7000 4350 2    50   ~ 0
S1_A1_HV
Text Label 7000 4450 2    50   ~ 0
S1_A2_HV
Text Label 7000 4250 2    50   ~ 0
S1_A0_HV
Text Label 7000 4550 2    50   ~ 0
S1_AS_HV
Wire Wire Line
	7400 5000 7400 4250
Wire Wire Line
	7300 5100 7300 4350
Wire Wire Line
	7300 5100 7650 5100
Wire Wire Line
	7000 4250 7400 4250
Wire Wire Line
	7000 4350 7300 4350
Wire Wire Line
	7200 5200 7200 4450
Wire Wire Line
	7200 4450 7000 4450
Wire Wire Line
	7200 5200 7650 5200
Wire Wire Line
	7100 5300 7100 4550
Wire Wire Line
	7100 4550 7000 4550
Wire Wire Line
	7100 5300 7650 5300
Wire Wire Line
	7400 5700 7400 6300
Wire Wire Line
	7400 6300 7000 6300
Wire Wire Line
	7300 5600 7300 6200
Wire Wire Line
	7300 6200 7000 6200
Wire Wire Line
	7300 5600 7650 5600
Wire Wire Line
	7200 5500 7200 6100
Wire Wire Line
	7200 6100 7000 6100
Wire Wire Line
	7200 5500 7650 5500
Wire Wire Line
	7100 5400 7100 6000
Wire Wire Line
	7100 6000 7000 6000
Wire Wire Line
	7100 5400 7650 5400
Wire Wire Line
	11600 8300 11950 8300
Text Label 11950 8300 0    50   ~ 0
S2_AS_LV
Wire Wire Line
	11600 8400 11950 8400
Text Label 11950 8400 0    50   ~ 0
S2_A2_LV
Wire Wire Line
	9400 7600 9050 7600
Text Label 9050 7600 2    50   ~ 0
S2_A0_LV
Text Label 9050 7900 2    50   ~ 0
S2_A1_LV
Wire Wire Line
	9050 7900 9400 7900
Wire Wire Line
	2100 2350 2200 2350
Wire Wire Line
	2200 2350 2200 2450
Connection ~ 2200 2450
Wire Wire Line
	2200 2450 2100 2450
Wire Wire Line
	2100 2750 2200 2750
Wire Wire Line
	2200 2750 2200 2850
Connection ~ 2200 2850
Wire Wire Line
	2200 2850 2850 2850
Wire Wire Line
	2200 7500 2850 7500
Connection ~ 2200 7500
Wire Wire Line
	2200 7400 2200 7500
Wire Wire Line
	2100 7400 2200 7400
Wire Wire Line
	2200 7100 2100 7100
Connection ~ 2200 7100
Wire Wire Line
	2200 7000 2200 7100
Wire Wire Line
	2100 7000 2200 7000
Wire Wire Line
	2850 7500 2850 7800
Wire Wire Line
	2350 7100 2200 7100
Text Label 2350 7200 0    50   ~ 0
S2_A2_HV-
Text Label 2350 7100 0    50   ~ 0
HV_REF
$Comp
L Connector:DB15_Female_MountingHoles J2
U 1 1 61E7C7DB
P 1800 7000
F 0 "J2" H 1955 7002 50  0000 L CNN
F 1 "TRIGGER_TTL" H 1955 6911 50  0000 L CNN
F 2 "Connector_Dsub:DSUB-15_Female_Horizontal_P2.77x2.84mm_EdgePinOffset7.70mm_Housed_MountingHolesOffset9.12mm" H 1800 7000 50  0001 C CNN
F 3 " ~" H 1800 7000 50  0001 C CNN
	1    1800 7000
	-1   0    0    1   
$EndComp
Wire Wire Line
	2100 7500 2200 7500
$Comp
L power:GND #PWR09
U 1 1 61E7C7D4
P 2850 7800
F 0 "#PWR09" H 2850 7550 50  0001 C CNN
F 1 "GND" H 2855 7627 50  0000 C CNN
F 2 "" H 2850 7800 50  0001 C CNN
F 3 "" H 2850 7800 50  0001 C CNN
	1    2850 7800
	1    0    0    -1  
$EndComp
Wire Wire Line
	2350 6800 2100 6800
Text Label 2350 6800 0    50   ~ 0
S2_AS_HV
Wire Wire Line
	2100 6600 2350 6600
Wire Wire Line
	2350 6500 2100 6500
Text Label 2350 6600 0    50   ~ 0
S2_A0_HV+
Text Label 2350 6500 0    50   ~ 0
S2_A0_HV-
Text Label 2350 7300 0    50   ~ 0
S2_A2_HV+
Wire Wire Line
	2350 7200 2100 7200
Wire Wire Line
	2100 7300 2350 7300
Text Label 2350 7700 0    50   ~ 0
S2_A1_HV+
Wire Wire Line
	2100 7700 2350 7700
Text Label 2350 7600 0    50   ~ 0
S2_A1_HV-
Wire Wire Line
	2350 7600 2100 7600
Wire Wire Line
	11850 9000 12000 9000
Wire Wire Line
	11850 9300 12000 9300
Connection ~ 11850 9000
Connection ~ 11850 9300
Wire Wire Line
	11600 9000 11850 9000
Wire Wire Line
	11600 9300 11850 9300
Text Label 1450 10350 1    50   ~ 0
ADC_INGND
Wire Wire Line
	1450 10550 1450 10350
$Comp
L Connector:Conn_Coaxial J3
U 1 1 619E4137
P 1450 10750
F 0 "J3" H 1550 10725 50  0000 L CNN
F 1 "Conn_Coaxial" H 1550 10634 50  0000 L CNN
F 2 "Connector_Coaxial:BNC_Amphenol_031-6575_Horizontal" H 1450 10750 50  0001 C CNN
F 3 " ~" H 1450 10750 50  0001 C CNN
	1    1450 10750
	-1   0    0    1   
$EndComp
Text Label 3200 10850 2    50   ~ 0
ADC_INGND
Text Label 3200 10650 2    50   ~ 0
ADC_IN5V
Wire Wire Line
	4150 9450 4350 9450
Wire Wire Line
	3600 10250 4050 10250
Wire Wire Line
	4250 10250 4800 10250
Text Label 4800 10250 0    50   ~ 0
HV_REF
$Comp
L Analog_ADC:MCP3301 U7
U 1 1 61966194
P 4150 10750
F 0 "U7" H 4100 10169 50  0000 C CNN
F 1 "MCP3301" H 4100 10260 50  0000 C CNN
F 2 "MCP3301:DIP254P762X432-8" H 4950 10650 50  0001 C CNN
F 3 "http://ww1.microchip.com/downloads/en/DeviceDoc/21700D.pdf" H 4950 10650 50  0001 C CNN
	1    4150 10750
	1    0    0    -1  
$EndComp
Wire Wire Line
	4050 11350 4050 11150
Wire Wire Line
	4250 10250 4250 10350
Wire Wire Line
	3600 9900 3850 9900
Text Label 3600 9900 2    50   ~ 0
ADC_REF
Wire Wire Line
	4150 9600 4150 9450
$Comp
L Regulator_Linear:LF47_TO252 U5
U 1 1 619A3A45
P 4150 9900
F 0 "U5" H 4150 10142 50  0000 C CNN
F 1 "LF47_TO252" H 4150 10051 50  0000 C CNN
F 2 "Package_TO_SOT_SMD:TO-252-2" H 4150 10125 50  0001 C CIN
F 3 "http://www.st.com/content/ccc/resource/technical/document/datasheet/c4/0e/7e/2a/be/bc/4c/bd/CD00000546.pdf/files/CD00000546.pdf/jcr:content/translations/en.CD00000546.pdf" H 4150 9850 50  0001 C CNN
	1    4150 9900
	-1   0    0    1   
$EndComp
Text Label 4800 9900 0    50   ~ 0
HV_REF
Wire Wire Line
	4800 9900 4450 9900
Wire Wire Line
	4050 10250 4050 10350
$Comp
L power:GND #PWR017
U 1 1 6198A32B
P 4050 11350
F 0 "#PWR017" H 4050 11100 50  0001 C CNN
F 1 "GND" H 4055 11177 50  0000 C CNN
F 2 "" H 4050 11350 50  0001 C CNN
F 3 "" H 4050 11350 50  0001 C CNN
	1    4050 11350
	1    0    0    -1  
$EndComp
Text Label 5050 10850 0    50   ~ 0
ADC_CS_HV
Text Label 5050 10750 0    50   ~ 0
ADC_MISO_HV
Text Label 5050 10650 0    50   ~ 0
ADC_CLK_HV
Wire Wire Line
	5050 10650 4650 10650
Wire Wire Line
	4650 10750 5050 10750
Wire Wire Line
	4650 10850 5050 10850
Text Label 3600 10250 2    50   ~ 0
ADC_REF
Wire Wire Line
	3200 10650 3550 10650
Wire Wire Line
	3200 10850 3550 10850
$Comp
L power:GND #PWR015
U 1 1 619A1D4F
P 4350 9450
F 0 "#PWR015" H 4350 9200 50  0001 C CNN
F 1 "GND" H 4355 9277 50  0000 C CNN
F 2 "" H 4350 9450 50  0001 C CNN
F 3 "" H 4350 9450 50  0001 C CNN
	1    4350 9450
	1    0    0    -1  
$EndComp
Wire Wire Line
	7250 9550 7950 9550
Text Label 7150 11500 3    50   ~ 0
HV_REF
Wire Wire Line
	7150 11500 7150 11250
Text Label 7350 11500 3    50   ~ 0
LV_REF
Wire Wire Line
	7350 11500 7350 11250
$Comp
L power:GND #PWR016
U 1 1 61E5DBC3
P 7950 9700
F 0 "#PWR016" H 7950 9450 50  0001 C CNN
F 1 "GND" H 7955 9527 50  0000 C CNN
F 2 "" H 7950 9700 50  0001 C CNN
F 3 "" H 7950 9700 50  0001 C CNN
	1    7950 9700
	1    0    0    -1  
$EndComp
Wire Wire Line
	7250 9850 7250 9550
Wire Wire Line
	7950 9550 7950 9700
$Comp
L Logic_LevelTranslator:TXB0108DQSR U6
U 1 1 61E3A167
P 7250 10550
F 0 "U6" H 7250 9669 50  0000 C CNN
F 1 "TXB0108DQSR" H 7250 9760 50  0000 C CNN
F 2 "TXB0108DQSR:SON40P400X200X55-20N" H 7250 9800 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/txb0108.pdf" H 7250 10450 50  0001 C CNN
	1    7250 10550
	-1   0    0    1   
$EndComp
Text Label 6450 10650 2    50   ~ 0
ADC_CS_HV
Text Label 6450 10750 2    50   ~ 0
ADC_MISO_HV
Text Label 6450 10850 2    50   ~ 0
ADC_CLK_HV
Wire Wire Line
	6450 10850 6850 10850
Wire Wire Line
	6850 10750 6450 10750
Wire Wire Line
	6850 10650 6450 10650
Text Label 8050 10850 0    50   ~ 0
ADC_CLK_LV
Text Label 8050 10750 0    50   ~ 0
ADC_MISO_LV
Text Label 8050 10650 0    50   ~ 0
ADC_CS_LV
Wire Wire Line
	8050 10650 7650 10650
Wire Wire Line
	7650 10750 8050 10750
Wire Wire Line
	7650 10850 8050 10850
Text Label 8050 10950 0    50   ~ 0
HV_REF
Wire Wire Line
	8050 10950 7650 10950
Wire Notes Line
	500  9150 6150 9150
Wire Wire Line
	8050 4400 8050 4700
$Comp
L MC3486N:MC3486N U1
U 1 1 61A4ED8C
P 5200 2600
F 0 "U1" H 5200 3570 50  0000 C CNN
F 1 "MC3486N" H 5200 3479 50  0000 C CNN
F 2 "MC3486N:DIP794W45P254L1969H508Q16" H 5200 2600 50  0001 L BNN
F 3 "" H 5200 2600 50  0001 L BNN
	1    5200 2600
	1    0    0    -1  
$EndComp
Text Label 4250 2100 2    50   ~ 0
HV_REF
Text Label 4250 2200 2    50   ~ 0
S1_A0_HV+
Wire Wire Line
	4500 2200 4250 2200
Text Label 4250 2300 2    50   ~ 0
S1_A0_HV-
Wire Wire Line
	4250 2300 4500 2300
Wire Wire Line
	4250 2100 4500 2100
Text Label 6150 1900 0    50   ~ 0
HV_REF
Wire Wire Line
	6150 1900 5900 1900
Wire Wire Line
	5900 2100 6150 2100
Text Label 6150 2100 0    50   ~ 0
S1_A0_HV
Text Label 4250 2800 2    50   ~ 0
S1_A2_HV-
Wire Wire Line
	4250 2800 4500 2800
Text Label 4250 2700 2    50   ~ 0
S1_A2_HV+
Wire Wire Line
	4500 2700 4250 2700
Wire Wire Line
	4500 2400 4250 2400
Wire Wire Line
	4250 2500 4500 2500
Text Label 4250 2400 2    50   ~ 0
S1_A1_HV+
Text Label 4250 2500 2    50   ~ 0
S1_A1_HV-
Text Label 4250 2600 2    50   ~ 0
HV_REF
Wire Wire Line
	4250 2600 4500 2600
Text Label 6150 2200 0    50   ~ 0
S1_A1_HV
Text Label 6150 2300 0    50   ~ 0
S1_A2_HV
Wire Wire Line
	5900 2300 6150 2300
Wire Wire Line
	5900 2200 6150 2200
$Comp
L power:GND #PWR0101
U 1 1 61B8D7F7
P 6000 3350
F 0 "#PWR0101" H 6000 3100 50  0001 C CNN
F 1 "GND" H 6005 3177 50  0000 C CNN
F 2 "" H 6000 3350 50  0001 C CNN
F 3 "" H 6000 3350 50  0001 C CNN
	1    6000 3350
	1    0    0    -1  
$EndComp
Wire Wire Line
	5900 3300 6000 3300
Wire Wire Line
	6000 3300 6000 3350
Wire Notes Line
	5950 5300 550  5300
$Comp
L MC3486N:MC3486N U3
U 1 1 61BFF331
P 5000 7200
F 0 "U3" H 5000 8170 50  0000 C CNN
F 1 "MC3486N" H 5000 8079 50  0000 C CNN
F 2 "MC3486N:DIP794W45P254L1969H508Q16" H 5000 7200 50  0001 L BNN
F 3 "" H 5000 7200 50  0001 L BNN
	1    5000 7200
	1    0    0    -1  
$EndComp
Text Label 4050 6700 2    50   ~ 0
HV_REF
Text Label 4050 6800 2    50   ~ 0
S2_A0_HV+
Wire Wire Line
	4300 6800 4050 6800
Text Label 4050 6900 2    50   ~ 0
S2_A0_HV-
Wire Wire Line
	4050 6900 4300 6900
Wire Wire Line
	4050 6700 4300 6700
Text Label 5950 6500 0    50   ~ 0
HV_REF
Wire Wire Line
	5950 6500 5700 6500
Wire Wire Line
	5700 6700 5950 6700
Text Label 5950 6700 0    50   ~ 0
S2_A0_HV
Text Label 4050 7400 2    50   ~ 0
S2_A2_HV-
Wire Wire Line
	4050 7400 4300 7400
Text Label 4050 7300 2    50   ~ 0
S2_A2_HV+
Wire Wire Line
	4300 7300 4050 7300
Wire Wire Line
	4300 7000 4050 7000
Wire Wire Line
	4050 7100 4300 7100
Text Label 4050 7000 2    50   ~ 0
S2_A1_HV+
Text Label 4050 7100 2    50   ~ 0
S2_A1_HV-
Text Label 4050 7200 2    50   ~ 0
HV_REF
Wire Wire Line
	4050 7200 4300 7200
Text Label 5950 6800 0    50   ~ 0
S2_A1_HV
Text Label 5950 6900 0    50   ~ 0
S2_A2_HV
Wire Wire Line
	5700 6900 5950 6900
Wire Wire Line
	5700 6800 5950 6800
$Comp
L power:GND #PWR0102
U 1 1 61BFF34F
P 5800 7950
F 0 "#PWR0102" H 5800 7700 50  0001 C CNN
F 1 "GND" H 5805 7777 50  0000 C CNN
F 2 "" H 5800 7950 50  0001 C CNN
F 3 "" H 5800 7950 50  0001 C CNN
	1    5800 7950
	1    0    0    -1  
$EndComp
Wire Wire Line
	5700 7900 5800 7900
Wire Wire Line
	5800 7900 5800 7950
Wire Wire Line
	1850 10750 1650 10750
Text Label 1850 10750 0    50   ~ 0
ADC_IN5V
Text Label 8800 5800 0    50   ~ 0
HV_REF
Wire Wire Line
	8800 5800 8450 5800
$EndSCHEMATC
