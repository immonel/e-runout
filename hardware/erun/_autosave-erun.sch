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
P 10850 8950
F 0 "U4" H 10850 10565 50  0000 C CNN
F 1 "Teensy4.0" H 10850 10474 50  0000 C CNN
F 2 "teensy:Teensy40" H 10450 9150 50  0001 C CNN
F 3 "" H 10450 9150 50  0001 C CNN
	1    10850 8950
	1    0    0    -1  
$EndComp
Wire Wire Line
	5100 1350 5350 1350
Text Label 5350 1350 0    50   ~ 0
S1_A0_HV
Text Label 5350 3500 0    50   ~ 0
S1_A1_HV
Wire Wire Line
	4100 1450 3850 1450
Wire Wire Line
	3850 1250 4100 1250
Text Label 3850 1450 2    50   ~ 0
S1_A0_HV+
Text Label 3850 1250 2    50   ~ 0
S1_A0_HV-
$Comp
L Interface_LineDriver:MC3486N U1
U 1 1 618BF9C9
P 4600 1350
F 0 "U1" H 5144 1396 50  0000 L CNN
F 1 "MC3486N" H 5144 1305 50  0000 L CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 4600 950 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/mc3486.pdf" H 4600 1350 50  0001 C CNN
	1    4600 1350
	1    0    0    -1  
$EndComp
$Comp
L power:+3.3V #PWR014
U 1 1 6198B2D9
P 12200 9800
F 0 "#PWR014" H 12200 9650 50  0001 C CNN
F 1 "+3.3V" H 12215 9973 50  0000 C CNN
F 2 "" H 12200 9800 50  0001 C CNN
F 3 "" H 12200 9800 50  0001 C CNN
	1    12200 9800
	1    0    0    -1  
$EndComp
Text Label 12350 9800 0    50   ~ 0
LV_REF
$Comp
L power:+5V #PWR012
U 1 1 6198BB4C
P 12200 9500
F 0 "#PWR012" H 12200 9350 50  0001 C CNN
F 1 "+5V" H 12215 9673 50  0000 C CNN
F 2 "" H 12200 9500 50  0001 C CNN
F 3 "" H 12200 9500 50  0001 C CNN
	1    12200 9500
	1    0    0    -1  
$EndComp
Text Label 12350 9500 0    50   ~ 0
HV_REF
$Comp
L power:GND #PWR011
U 1 1 619B8330
P 8700 9400
F 0 "#PWR011" H 8700 9150 50  0001 C CNN
F 1 "GND" H 8705 9227 50  0000 C CNN
F 2 "" H 8700 9400 50  0001 C CNN
F 3 "" H 8700 9400 50  0001 C CNN
	1    8700 9400
	1    0    0    -1  
$EndComp
Wire Wire Line
	8700 9200 8700 9400
Text Label 4900 1650 0    50   ~ 0
HV_REF
Wire Wire Line
	4600 1650 4900 1650
$Comp
L power:GND #PWR02
U 1 1 619ED40F
P 4300 2700
F 0 "#PWR02" H 4300 2450 50  0001 C CNN
F 1 "GND" H 4305 2527 50  0000 C CNN
F 2 "" H 4300 2700 50  0001 C CNN
F 3 "" H 4300 2700 50  0001 C CNN
	1    4300 2700
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR01
U 1 1 619F196B
P 4200 1650
F 0 "#PWR01" H 4200 1400 50  0001 C CNN
F 1 "GND" H 4205 1477 50  0000 C CNN
F 2 "" H 4200 1650 50  0001 C CNN
F 3 "" H 4200 1650 50  0001 C CNN
	1    4200 1650
	1    0    0    -1  
$EndComp
Text Label 4800 1050 0    50   ~ 0
HV_REF
Wire Wire Line
	4800 1050 4500 1050
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
F 2 "Connector_Dsub:DSUB-44-HD_Female_Vertical_P2.29x1.98mm_MountingHoles" H 1800 2350 50  0001 C CNN
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
Text Label 9400 8700 2    50   ~ 0
ADC_CS_LV
Wire Wire Line
	9400 8700 9750 8700
Wire Wire Line
	8700 9200 9750 9200
Text Label 9400 9500 2    50   ~ 0
ADC_CLK_LV
Wire Wire Line
	9400 9500 9750 9500
Text Label 9400 8900 2    50   ~ 0
ADC_MISO_LV
Wire Wire Line
	9400 8900 9750 8900
Text Label 9400 7900 2    50   ~ 0
S1_A2_LV
Text Label 9400 7700 2    50   ~ 0
S1_A0_LV
Wire Wire Line
	9750 7700 9400 7700
Wire Wire Line
	9400 7800 9750 7800
Wire Wire Line
	9750 7900 9400 7900
Text Label 9400 7800 2    50   ~ 0
S1_A1_LV
Wire Wire Line
	9750 8000 9400 8000
Text Label 9400 8000 2    50   ~ 0
S1_AS_LV
Wire Wire Line
	2850 2850 2850 3150
Wire Wire Line
	8250 5300 8600 5300
Text Label 8600 5300 0    50   ~ 0
S1_AS_LV
$Comp
L Logic_LevelTranslator:TXB0108DQSR U2
U 1 1 618C6CB9
P 7850 5400
F 0 "U2" H 7850 4611 50  0000 C CNN
F 1 "TXB0108DQSR" H 7850 4520 50  0000 C CNN
F 2 "Package_SON:USON-20_2x4mm_P0.4mm" H 7850 4650 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/txb0108.pdf" H 7850 5300 50  0001 C CNN
	1    7850 5400
	-1   0    0    1   
$EndComp
Wire Wire Line
	7450 5000 7200 5000
Wire Wire Line
	8250 5000 8600 5000
Wire Wire Line
	8600 5100 8250 5100
Wire Wire Line
	8250 5200 8600 5200
Text Label 8600 5000 0    50   ~ 0
S1_A0_LV
Text Label 8600 5200 0    50   ~ 0
S1_A2_LV
Text Label 8600 5100 0    50   ~ 0
S1_A1_LV
Wire Wire Line
	8550 4400 8550 4550
Wire Wire Line
	7850 4400 8550 4400
Wire Wire Line
	7850 4700 7850 4400
$Comp
L power:GND #PWR05
U 1 1 61998562
P 8550 4550
F 0 "#PWR05" H 8550 4300 50  0001 C CNN
F 1 "GND" H 8555 4377 50  0000 C CNN
F 2 "" H 8550 4550 50  0001 C CNN
F 3 "" H 8550 4550 50  0001 C CNN
	1    8550 4550
	1    0    0    -1  
$EndComp
Wire Wire Line
	7950 6350 7950 6100
Text Label 7950 6350 3    50   ~ 0
LV_REF
Wire Wire Line
	7750 6350 7750 6100
Text Label 7750 6350 3    50   ~ 0
HV_REF
Text Label 6800 6300 2    50   ~ 0
S2_AS_HV
Wire Wire Line
	7200 5700 7450 5700
Text Label 6800 6000 2    50   ~ 0
S2_A0_HV
Text Label 6800 6200 2    50   ~ 0
S2_A2_HV
Text Label 6800 6100 2    50   ~ 0
S2_A1_HV
Wire Wire Line
	8250 5700 8600 5700
Text Label 8600 5700 0    50   ~ 0
S2_AS_LV
Wire Wire Line
	8250 5400 8600 5400
Wire Wire Line
	8600 5500 8250 5500
Wire Wire Line
	8250 5600 8600 5600
Text Label 8600 5400 0    50   ~ 0
S2_A0_LV
Text Label 8600 5600 0    50   ~ 0
S2_A2_LV
Text Label 8600 5500 0    50   ~ 0
S2_A1_LV
Text Label 6800 4350 2    50   ~ 0
S1_A1_HV
Text Label 6800 4450 2    50   ~ 0
S1_A2_HV
Text Label 6800 4250 2    50   ~ 0
S1_A0_HV
Text Label 6800 4550 2    50   ~ 0
S1_AS_HV
Wire Wire Line
	7200 5000 7200 4250
Wire Wire Line
	7100 5100 7100 4350
Wire Wire Line
	7100 5100 7450 5100
Wire Wire Line
	6800 4250 7200 4250
Wire Wire Line
	6800 4350 7100 4350
Wire Wire Line
	7000 5200 7000 4450
Wire Wire Line
	7000 4450 6800 4450
Wire Wire Line
	7000 5200 7450 5200
Wire Wire Line
	6900 5300 6900 4550
Wire Wire Line
	6900 4550 6800 4550
Wire Wire Line
	6900 5300 7450 5300
Wire Wire Line
	7200 5700 7200 6300
Wire Wire Line
	7200 6300 6800 6300
Wire Wire Line
	7100 5600 7100 6200
Wire Wire Line
	7100 6200 6800 6200
Wire Wire Line
	7100 5600 7450 5600
Wire Wire Line
	7000 5500 7000 6100
Wire Wire Line
	7000 6100 6800 6100
Wire Wire Line
	7000 5500 7450 5500
Wire Wire Line
	6900 5400 6900 6000
Wire Wire Line
	6900 6000 6800 6000
Wire Wire Line
	6900 5400 7450 5400
Wire Wire Line
	11950 8800 12300 8800
Text Label 12300 8800 0    50   ~ 0
S2_AS_LV
Wire Wire Line
	11950 8900 12300 8900
Text Label 12300 8900 0    50   ~ 0
S2_A2_LV
Wire Wire Line
	9750 8100 9400 8100
Text Label 9400 8100 2    50   ~ 0
S2_A0_LV
Text Label 9400 8400 2    50   ~ 0
S2_A1_LV
Wire Wire Line
	9400 8400 9750 8400
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
F 2 "Connector_Dsub:DSUB-44-HD_Female_Vertical_P2.29x1.98mm_MountingHoles" H 1800 7000 50  0001 C CNN
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
	12200 9500 12350 9500
Wire Wire Line
	12200 9800 12350 9800
Connection ~ 12200 9500
Connection ~ 12200 9800
Wire Wire Line
	11950 9500 12200 9500
Wire Wire Line
	11950 9800 12200 9800
Text Label 3850 2300 2    50   ~ 0
S1_A2_HV-
$Comp
L Interface_LineDriver:MC3486N U1
U 2 1 618BDA93
P 4600 2400
F 0 "U1" H 5144 2446 50  0000 L CNN
F 1 "MC3486N" H 5144 2355 50  0000 L CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 4600 2000 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/mc3486.pdf" H 4600 2400 50  0001 C CNN
	2    4600 2400
	1    0    0    -1  
$EndComp
Wire Wire Line
	3850 2300 4100 2300
Wire Wire Line
	4500 2100 4750 2100
Text Label 4750 2100 0    50   ~ 0
HV_REF
Wire Wire Line
	4600 2700 4900 2700
Text Label 4900 2700 0    50   ~ 0
HV_REF
Text Label 3850 2500 2    50   ~ 0
S1_A2_HV+
Wire Wire Line
	4100 2500 3850 2500
Text Label 5350 2400 0    50   ~ 0
S1_A2_HV
Wire Wire Line
	5100 2400 5350 2400
Wire Wire Line
	4500 2700 4300 2700
Wire Wire Line
	4200 1650 4500 1650
Text Label 4900 3800 0    50   ~ 0
HV_REF
Wire Wire Line
	4600 3800 4900 3800
$Comp
L Interface_LineDriver:MC3486N U1
U 3 1 618C0C51
P 4600 3500
F 0 "U1" H 5144 3546 50  0000 L CNN
F 1 "MC3486N" H 5144 3455 50  0000 L CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 4600 3100 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/mc3486.pdf" H 4600 3500 50  0001 C CNN
	3    4600 3500
	1    0    0    -1  
$EndComp
Wire Wire Line
	4850 3200 4500 3200
Wire Wire Line
	5100 3500 5350 3500
Wire Wire Line
	4100 3600 3850 3600
Wire Wire Line
	3850 3400 4100 3400
Text Label 3850 3600 2    50   ~ 0
S1_A1_HV+
Text Label 3850 3400 2    50   ~ 0
S1_A1_HV-
Text Label 4850 3200 0    50   ~ 0
HV_REF
Wire Wire Line
	4300 3800 4500 3800
$Comp
L power:GND #PWR04
U 1 1 619F2EB7
P 4300 3800
F 0 "#PWR04" H 4300 3550 50  0001 C CNN
F 1 "GND" H 4305 3627 50  0000 C CNN
F 2 "" H 4300 3800 50  0001 C CNN
F 3 "" H 4300 3800 50  0001 C CNN
	1    4300 3800
	1    0    0    -1  
$EndComp
Wire Wire Line
	5100 6050 5350 6050
Text Label 5350 6050 0    50   ~ 0
S2_A0_HV
Text Label 5350 8200 0    50   ~ 0
S2_A1_HV
Wire Wire Line
	4100 6150 3850 6150
Wire Wire Line
	3850 5950 4100 5950
Text Label 3850 6150 2    50   ~ 0
S2_A0_HV+
Text Label 3850 5950 2    50   ~ 0
S2_A0_HV-
$Comp
L Interface_LineDriver:MC3486N U3
U 1 1 625D4659
P 4600 6050
F 0 "U3" H 5144 6096 50  0000 L CNN
F 1 "MC3486N" H 5144 6005 50  0000 L CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 4600 5650 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/mc3486.pdf" H 4600 6050 50  0001 C CNN
	1    4600 6050
	1    0    0    -1  
$EndComp
Text Label 4900 6350 0    50   ~ 0
HV_REF
Wire Wire Line
	4600 6350 4900 6350
$Comp
L power:GND #PWR08
U 1 1 625D4661
P 4300 7400
F 0 "#PWR08" H 4300 7150 50  0001 C CNN
F 1 "GND" H 4305 7227 50  0000 C CNN
F 2 "" H 4300 7400 50  0001 C CNN
F 3 "" H 4300 7400 50  0001 C CNN
	1    4300 7400
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR07
U 1 1 625D4667
P 4200 6350
F 0 "#PWR07" H 4200 6100 50  0001 C CNN
F 1 "GND" H 4205 6177 50  0000 C CNN
F 2 "" H 4200 6350 50  0001 C CNN
F 3 "" H 4200 6350 50  0001 C CNN
	1    4200 6350
	1    0    0    -1  
$EndComp
Text Label 4800 5750 0    50   ~ 0
HV_REF
Wire Wire Line
	4800 5750 4500 5750
Text Label 3850 7000 2    50   ~ 0
S2_A2_HV-
$Comp
L Interface_LineDriver:MC3486N U3
U 2 1 625D4670
P 4600 7100
F 0 "U3" H 5144 7146 50  0000 L CNN
F 1 "MC3486N" H 5144 7055 50  0000 L CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 4600 6700 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/mc3486.pdf" H 4600 7100 50  0001 C CNN
	2    4600 7100
	1    0    0    -1  
$EndComp
Wire Wire Line
	3850 7000 4100 7000
Wire Wire Line
	4500 6800 4750 6800
Text Label 4750 6800 0    50   ~ 0
HV_REF
Wire Wire Line
	4600 7400 4900 7400
Text Label 4900 7400 0    50   ~ 0
HV_REF
Text Label 3850 7200 2    50   ~ 0
S2_A2_HV+
Wire Wire Line
	4100 7200 3850 7200
Text Label 5350 7100 0    50   ~ 0
S2_A2_HV
Wire Wire Line
	5100 7100 5350 7100
Wire Wire Line
	4500 7400 4300 7400
Wire Wire Line
	4200 6350 4500 6350
Text Label 4900 8500 0    50   ~ 0
HV_REF
Wire Wire Line
	4600 8500 4900 8500
$Comp
L Interface_LineDriver:MC3486N U3
U 3 1 625D4683
P 4600 8200
F 0 "U3" H 5144 8246 50  0000 L CNN
F 1 "MC3486N" H 5144 8155 50  0000 L CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 4600 7800 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/mc3486.pdf" H 4600 8200 50  0001 C CNN
	3    4600 8200
	1    0    0    -1  
$EndComp
Wire Wire Line
	4850 7900 4500 7900
Wire Wire Line
	5100 8200 5350 8200
Wire Wire Line
	4100 8300 3850 8300
Wire Wire Line
	3850 8100 4100 8100
Text Label 3850 8300 2    50   ~ 0
S2_A1_HV+
Text Label 3850 8100 2    50   ~ 0
S2_A1_HV-
Text Label 4850 7900 0    50   ~ 0
HV_REF
Wire Wire Line
	4300 8500 4500 8500
$Comp
L power:GND #PWR010
U 1 1 625D4691
P 4300 8500
F 0 "#PWR010" H 4300 8250 50  0001 C CNN
F 1 "GND" H 4305 8327 50  0000 C CNN
F 2 "" H 4300 8500 50  0001 C CNN
F 3 "" H 4300 8500 50  0001 C CNN
	1    4300 8500
	1    0    0    -1  
$EndComp
Text Label 1450 11400 1    50   ~ 0
ADC_IN5V
Text Label 1850 11800 0    50   ~ 0
ADC_INGND
Wire Wire Line
	1650 11800 1850 11800
Wire Wire Line
	1450 11400 1450 11600
$Comp
L Connector:Conn_Coaxial J3
U 1 1 619E4137
P 1450 11800
F 0 "J3" H 1550 11775 50  0000 L CNN
F 1 "Conn_Coaxial" H 1550 11684 50  0000 L CNN
F 2 "Connector_Coaxial:BNC_Amphenol_031-6575_Horizontal" H 1450 11800 50  0001 C CNN
F 3 " ~" H 1450 11800 50  0001 C CNN
	1    1450 11800
	-1   0    0    1   
$EndComp
Text Label 3200 11900 2    50   ~ 0
ADC_INGND
Text Label 3200 11700 2    50   ~ 0
ADC_IN5V
Wire Wire Line
	4150 10500 4350 10500
Wire Wire Line
	3600 11300 4050 11300
Wire Wire Line
	4250 11300 4800 11300
Text Label 4800 11300 0    50   ~ 0
HV_REF
$Comp
L Analog_ADC:MCP3301 U7
U 1 1 61966194
P 4150 11800
F 0 "U7" H 4100 11219 50  0000 C CNN
F 1 "MCP3301" H 4100 11310 50  0000 C CNN
F 2 "MCP3301:DIP254P762X432-8" H 4950 11700 50  0001 C CNN
F 3 "http://ww1.microchip.com/downloads/en/DeviceDoc/21700D.pdf" H 4950 11700 50  0001 C CNN
	1    4150 11800
	1    0    0    -1  
$EndComp
Wire Wire Line
	4050 12400 4050 12200
Wire Wire Line
	4250 11300 4250 11400
Wire Wire Line
	3600 10950 3850 10950
Text Label 3600 10950 2    50   ~ 0
ADC_REF
Wire Wire Line
	4150 10650 4150 10500
$Comp
L Regulator_Linear:LF47_TO252 U5
U 1 1 619A3A45
P 4150 10950
F 0 "U5" H 4150 11192 50  0000 C CNN
F 1 "LF47_TO252" H 4150 11101 50  0000 C CNN
F 2 "Package_TO_SOT_SMD:TO-252-2" H 4150 11175 50  0001 C CIN
F 3 "http://www.st.com/content/ccc/resource/technical/document/datasheet/c4/0e/7e/2a/be/bc/4c/bd/CD00000546.pdf/files/CD00000546.pdf/jcr:content/translations/en.CD00000546.pdf" H 4150 10900 50  0001 C CNN
	1    4150 10950
	-1   0    0    1   
$EndComp
Text Label 4800 10950 0    50   ~ 0
HV_REF
Wire Wire Line
	4800 10950 4450 10950
Wire Wire Line
	4050 11300 4050 11400
$Comp
L power:GND #PWR017
U 1 1 6198A32B
P 4050 12400
F 0 "#PWR017" H 4050 12150 50  0001 C CNN
F 1 "GND" H 4055 12227 50  0000 C CNN
F 2 "" H 4050 12400 50  0001 C CNN
F 3 "" H 4050 12400 50  0001 C CNN
	1    4050 12400
	1    0    0    -1  
$EndComp
Text Label 5050 11900 0    50   ~ 0
ADC_CS_HV
Text Label 5050 11800 0    50   ~ 0
ADC_MISO_HV
Text Label 5050 11700 0    50   ~ 0
ADC_CLK_HV
Wire Wire Line
	5050 11700 4650 11700
Wire Wire Line
	4650 11800 5050 11800
Wire Wire Line
	4650 11900 5050 11900
Text Label 3600 11300 2    50   ~ 0
ADC_REF
Wire Wire Line
	3200 11700 3550 11700
Wire Wire Line
	3200 11900 3550 11900
$Comp
L power:GND #PWR015
U 1 1 619A1D4F
P 4350 10500
F 0 "#PWR015" H 4350 10250 50  0001 C CNN
F 1 "GND" H 4355 10327 50  0000 C CNN
F 2 "" H 4350 10500 50  0001 C CNN
F 3 "" H 4350 10500 50  0001 C CNN
	1    4350 10500
	1    0    0    -1  
$EndComp
Wire Wire Line
	7250 10600 7950 10600
Text Label 7150 12550 3    50   ~ 0
HV_REF
Wire Wire Line
	7150 12550 7150 12300
Text Label 7350 12550 3    50   ~ 0
LV_REF
Wire Wire Line
	7350 12550 7350 12300
$Comp
L power:GND #PWR016
U 1 1 61E5DBC3
P 7950 10750
F 0 "#PWR016" H 7950 10500 50  0001 C CNN
F 1 "GND" H 7955 10577 50  0000 C CNN
F 2 "" H 7950 10750 50  0001 C CNN
F 3 "" H 7950 10750 50  0001 C CNN
	1    7950 10750
	1    0    0    -1  
$EndComp
Wire Wire Line
	7250 10900 7250 10600
Wire Wire Line
	7950 10600 7950 10750
$Comp
L Logic_LevelTranslator:TXB0108DQSR U6
U 1 1 61E3A167
P 7250 11600
F 0 "U6" H 7250 10719 50  0000 C CNN
F 1 "TXB0108DQSR" H 7250 10810 50  0000 C CNN
F 2 "Package_SON:USON-20_2x4mm_P0.4mm" H 7250 10850 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/txb0108.pdf" H 7250 11500 50  0001 C CNN
	1    7250 11600
	-1   0    0    1   
$EndComp
Text Label 6450 11700 2    50   ~ 0
ADC_CS_HV
Text Label 6450 11800 2    50   ~ 0
ADC_MISO_HV
Text Label 6450 11900 2    50   ~ 0
ADC_CLK_HV
Wire Wire Line
	6450 11900 6850 11900
Wire Wire Line
	6850 11800 6450 11800
Wire Wire Line
	6850 11700 6450 11700
Text Label 8050 11900 0    50   ~ 0
ADC_CLK_LV
Text Label 8050 11800 0    50   ~ 0
ADC_MISO_LV
Text Label 8050 11700 0    50   ~ 0
ADC_CS_LV
Wire Wire Line
	8050 11700 7650 11700
Wire Wire Line
	7650 11800 8050 11800
Wire Wire Line
	7650 11900 8050 11900
Text Label 8050 12000 0    50   ~ 0
LLC_OE
Wire Wire Line
	8050 12000 7650 12000
Text Label 4900 4750 0    50   ~ 0
HV_REF
Wire Wire Line
	4600 4750 4900 4750
$Comp
L Interface_LineDriver:MC3486N U1
U 4 1 62659DD4
P 4600 4450
F 0 "U1" H 5144 4496 50  0000 L CNN
F 1 "MC3486N" H 5144 4405 50  0000 L CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 4600 4050 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/mc3486.pdf" H 4600 4450 50  0001 C CNN
	4    4600 4450
	1    0    0    -1  
$EndComp
Wire Wire Line
	4850 4150 4500 4150
Text Label 4850 4150 0    50   ~ 0
HV_REF
Wire Wire Line
	4300 4750 4500 4750
$Comp
L power:GND #PWR06
U 1 1 62659DE2
P 4300 4750
F 0 "#PWR06" H 4300 4500 50  0001 C CNN
F 1 "GND" H 4305 4577 50  0000 C CNN
F 2 "" H 4300 4750 50  0001 C CNN
F 3 "" H 4300 4750 50  0001 C CNN
	1    4300 4750
	1    0    0    -1  
$EndComp
Text Label 4900 9550 0    50   ~ 0
HV_REF
Wire Wire Line
	4600 9550 4900 9550
$Comp
L Interface_LineDriver:MC3486N U3
U 4 1 626CC157
P 4600 9250
F 0 "U3" H 5144 9296 50  0000 L CNN
F 1 "MC3486N" H 5144 9205 50  0000 L CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 4600 8850 50  0001 C CNN
F 3 "http://www.ti.com/lit/ds/symlink/mc3486.pdf" H 4600 9250 50  0001 C CNN
	4    4600 9250
	1    0    0    -1  
$EndComp
Wire Wire Line
	4850 8950 4500 8950
Wire Wire Line
	5100 9250 5350 9250
Text Label 4850 8950 0    50   ~ 0
HV_REF
Wire Wire Line
	4300 9550 4500 9550
$Comp
L power:GND #PWR013
U 1 1 626CC165
P 4300 9550
F 0 "#PWR013" H 4300 9300 50  0001 C CNN
F 1 "GND" H 4305 9377 50  0000 C CNN
F 2 "" H 4300 9550 50  0001 C CNN
F 3 "" H 4300 9550 50  0001 C CNN
	1    4300 9550
	1    0    0    -1  
$EndComp
Wire Notes Line
	5950 5300 550  5300
Wire Notes Line
	500  10200 6150 10200
$EndSCHEMATC
